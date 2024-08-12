import { Building2, CalendarOff, Plus, Users } from 'lucide-react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Button } from './Button';
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
      <header className="w-full bg-woodsmoke-950 p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h2 className="text-xl font-semibold text-woodsmoke-50 md:text-2xl">
            Events Challenge
          </h2>
          <select
            onChange={onSelectCommunity}
            className="rounded border-[1px] border-woodsmoke-50 bg-woodsmoke-950 p-2 text-woodsmoke-50"
          >
            <option>Select a event</option>
            {communities &&
              communities.map((community) => (
                <option key={community._id} value={community._id}>
                  {community.name}
                </option>
              ))}
          </select>
        </div>
      </header>

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
              <div className="flex-[1]">
                <h4 className="mb-8 mt-16 text-2xl">Event Summary</h4>
                {/* currently in event */}
                <div>
                  <span className="flex items-center gap-4 text-woodsmoke-400">
                    <Users size={30} />
                    People in the event
                  </span>
                  <span className="block text-4xl">{currentInEvent}</span>
                </div>
                {/* by company */}
                <div className="mt-8">
                  <span className="mb-2 flex items-center gap-4 text-woodsmoke-400">
                    <Building2 size={30} />
                    People by company
                  </span>
                  {Object.keys(currentInEventByCompany).map((company) => (
                    <div
                      key={company + currentInEventByCompany[company]}
                      className="capitalize"
                    >
                      <span>{company}</span>
                      <span className="ml-2">
                        ({currentInEventByCompany[company]})
                      </span>
                    </div>
                  ))}
                </div>
                {/* not checked in */}
                <div className="mt-8">
                  <span className="flex items-center gap-4 text-woodsmoke-400">
                    <CalendarOff size={30} />
                    People not checked in
                  </span>
                  <span className="block text-4xl">{notCheckedIn}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCommunity === null && <h2>Select an event</h2>}
      </main>
    </>
  );
};
