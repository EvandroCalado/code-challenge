import React from 'react';

export const Button = ({
  children,
  type = 'button',
  onClick,
  variant,
  ...props
}) => {
  const buttonVariants = {
    primary: 'bg-woodsmoke-950 text-white hover:bg-woodsmoke-950/90',

    secondary: 'border-woodsmoke-300 hover:bg-woodsmoke-100/30',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonVariants[variant]} flex items-center gap-2 rounded-md border-[1px] px-4 py-2 text-sm font-semibold duration-150 disabled:pointer-events-none disabled:bg-woodsmoke-200 disabled:hover:bg-woodsmoke-200`}
      {...props}
    >
      {children}
    </button>
  );
};
