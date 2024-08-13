import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button } from '../Button';
import { Empty } from '../Empty';
import { EventSummary } from '../eventSummary';
import { Person } from '../Person';

export const Event = ({
  selectedCommunity,
  eventTitle,
  peoples,
  morePeople,
  setMorePeople,
  totalPeples,
  noMorePeople,
}) => {
  const checkIn = async (personId) => {
    await Meteor.callAsync('checkIn', personId);
  };

  const checkOut = async (personId) => {
    await Meteor.callAsync('checkOut', personId);
  };

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
    <main className="mx-auto my-4 max-w-7xl p-4">
      {selectedCommunity && (
        <div className="rounded-lg border-[1px] border-woodsmoke-300 p-8">
          <h1 className="text-3xl font-semibold uppercase">{eventTitle}</h1>
          <div className="flex w-full items-start gap-8 max-md:flex-col">
            <div className="w-full md:flex-[2]">
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
              {selectedCommunity !== 'Select a event' && (
                <div className="flex items-center justify-center text-center">
                  <Button
                    onClick={() => setMorePeople(morePeople + 1)}
                    variant="primary"
                    disabled={noMorePeople}
                  >
                    More persons
                  </Button>
                </div>
              )}
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

      {selectedCommunity === null && <Empty />}
    </main>
  );
};
