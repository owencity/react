import React from 'react'

export default function Button({
handleClick,
message,
children
} : {
    handleClick: (message: string) => void;
    message: string;
    children: React.ReactNode;
}
) {
  return (
    <>
    <button onClick={() => handleClick("playing!")}>{children}</button>
    </>
  );
}
