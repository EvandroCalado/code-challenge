import React from 'react';
import { Button } from '../Button';

export const Person = ({
  id,
  firstName,
  lastName,
  companyName,
  title,
  checkedInAt,
  checkedOutAt,
  checkIn,
  checkOut,
}) => (
  <div
    key={id}
    className="my-4 grid grid-cols-2 gap-4 border-b border-woodsmoke-300 pb-4 sm:grid-cols-4"
  >
    {/* name */}
    <div>
      <h4>
        {firstName} {lastName}
      </h4>

      <div className="flex flex-col text-xs text-woodsmoke-400">
        <p>{companyName ?? 'N/A'},</p>
        <span className="uppercase">{title ?? 'N/A'}</span>
      </div>
    </div>

    {/* checked */}
    <div className="text-sm max-sm:hidden sm:col-span-2">
      <span className="block">
        Checked in: {checkedInAt ? checkedInAt.toLocaleString() : 'N/A'}
      </span>

      <span>
        Checked out: {checkedOutAt ? checkedOutAt.toLocaleString() : 'N/A'}
      </span>
    </div>

    {/* buttons */}
    <div className="flex items-center justify-end">
      {!checkedInAt ? (
        <Button onClick={checkIn} type="button" variant="primary">
          Check In
        </Button>
      ) : (
        <Button onClick={checkOut} type="button" variant="secondary">
          Check Out
        </Button>
      )}
    </div>
  </div>
);
