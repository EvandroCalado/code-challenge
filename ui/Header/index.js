import React from 'react';

export const Header = ({ onSelectCommunity, communities }) => (
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
);
