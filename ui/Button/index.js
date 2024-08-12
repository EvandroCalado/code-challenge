import React from 'react';

export const Button = ({ children, type = 'button', onClick, variant }) => {
  const buttonVariants = {
    primary:
      'flex items-center gap-2 rounded-md border-[1px] bg-woodsmoke-950 px-4 py-2 text-sm font-semibold text-white duration-150 hover:bg-woodsmoke-950/90',

    secondary:
      'flex items-center gap-2 rounded-md border-[1px] border-woodsmoke-300 px-4 py-2 text-sm font-semibold duration-150 hover:bg-woodsmoke-100/30',
  };

  return (
    <button type={type} onClick={onClick} className={buttonVariants[variant]}>
      {children}
    </button>
  );
};
