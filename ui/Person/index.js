import React from 'react';
import { Button } from '../Button';

export const Person = ({
  id,
  firstName,
  lastName,
  companyName,
  title,
  checkedInAt,
  checkIn,
  checkOut,
}) => (
  <div
    key={id}
    className="my-4 grid grid-cols-4 gap-4 border-b border-woodsmoke-300 pb-4"
  >
    {/* name */}
    <div className="col-span-2">
      <h4>
        {firstName} {lastName}
      </h4>
      <p className="text-xs text-woodsmoke-400">
        {companyName ?? 'N/A'},
        <span className="ml-2 uppercase">{title ?? 'N/A'}</span>
      </p>
    </div>
    {/* checked */}
    <div className="flex flex-col text-sm text-woodsmoke-400">
      Checked in:
      <span />
      <span>{checkedInAt ? checkedInAt.toLocaleString() : 'N/A'}</span>
    </div>
    {/* buttons */}
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
);
