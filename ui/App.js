import { Plus } from 'lucide-react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Button } from './Button';
import { EventSummary } from './eventSummary';
import { Header } from './Header';
import { Person } from './Person';

export const App = () => {
  Meteor.subscribe('totalPeople');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [morePeople, setMorePeople] = useState(1);

  const peoplePerPage = 7;

  const { communities, peoples, totalPeples } = useTracker(() => {
    Meteor.subscribe('communities');
    Meteor.subscribe('people');

    return {
      communities: Communities.find().fetch(),
      peoples: People.find(
        { communityId: selectedCommunity },
        {
          sort: { checkedInAt: -1 },
          limit: peoplePerPage * morePeople,
        }
      ).fetch(),
      totalPeples: People.find({ communityId: selectedCommunity }).count(),
    };
  }, [selectedCommunity, morePeople]);

  const onSelectCommunity = (e) => {
    setSelectedCommunity(e.target.value);
  };

  const checkIn = async (personId) => {
    await Meteor.callAsync('checkIn', personId);
  };

  const checkOut = async (personId) => {
    await Meteor.callAsync('checkIn', personId);
  };

  const eventTitle = communities.filter(
    (community) => community._id === selectedCommunity
  )[0]?.name;

  const currentInEvent = peoples.filter((person) => person.checkedInAt).length;
  const notCheckedIn = totalPeples - currentInEvent;
  const currentInEventByCompany = peoples
    .filter((person) => person.checkedInAt)
    .reduce((acc, person) => {
      if (acc[person.companyName ?? 'N/A']) {
        acc[person.companyName ?? 'N/A'] += 1;
      } else {
        acc[person.companyName ?? 'N/A'] = 1;
      }
      return acc;
    }, {});

  return (
    <>
      {/* header */}
      <Header onSelectCommunity={onSelectCommunity} communities={communities} />

      {/* event */}
      <main className="mx-auto my-8 max-w-7xl p-4">
        {selectedCommunity && (
          <div className="rounded-lg border-[1px] border-woodsmoke-300 p-8">
            <h1 className="text-3xl font-semibold uppercase">{eventTitle}</h1>
            <div className="flex items-start gap-8">
              <div className="flex-[2]">
                <h4 className="mb-4 mt-16 text-2xl">Attendees</h4>

                {/* person */}
                {peoples.map((person) => (
                  <Person
                    key={person._id}
                    {...person}
                    checkIn={() => checkIn(person._id)}
                    checkOut={() => checkOut(person._id)}
                  />
                ))}

                {/* more people button */}
                <div className="flex items-center justify-center text-center">
                  <Button
                    onClick={() => setMorePeople(morePeople + 1)}
                    variant="primary"
                  >
                    <Plus size={22} />
                    More persons
                  </Button>
                </div>
              </div>

              {/* event summary */}
              <EventSummary
                currentInEvent={currentInEvent}
                currentInEventByCompany={currentInEventByCompany}
                notCheckedIn={notCheckedIn}
              />
            </div>
          </div>
        )}

        {selectedCommunity === null && <h2>Select an event</h2>}
      </main>
    </>
  );
};
