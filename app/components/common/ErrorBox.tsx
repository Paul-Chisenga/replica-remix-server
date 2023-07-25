import React from "react";

interface Props {
  title?: string;
  message: string;
}

const ErrorBox: React.FC<Props> = ({ title, message }) => {
  return (
    <div className="w-full max-w-screen-md p-4 mx-auto">
      <div className="p-24 text-center border rounded-xl">
        {title && <h1 className="text-xl font-bold md:text-3xl">{title}</h1>}
        <p className="text-sm font-medium opacity-90 md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default ErrorBox;
