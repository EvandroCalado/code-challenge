import { Building2, CalendarOff, Users } from 'lucide-react';
import React from 'react';

export const EventSummary = ({
  currentInEvent,
  currentInEventByCompany,
  notCheckedIn,
}) => (
  <div className="flex-[1]">
    <h4 className="mb-8 mt-16 text-2xl">Event Summary</h4>

    {/* currently in event */}
    <div className="border-b border-woodsmoke-300 pb-4">
      <span className="flex items-center gap-4 text-woodsmoke-400">
        <Users size={30} />
        People in the event
      </span>
      <span className="block text-4xl">{currentInEvent}</span>
    </div>

    {/* by company */}
    <div className="mt-8 border-b border-woodsmoke-300 pb-4">
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
          <span className="ml-2">({currentInEventByCompany[company]})</span>
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
);
