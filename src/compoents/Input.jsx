import React, { useId, useState } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", forPassword = false, ...props },
  ref
) {
  const id = useId();
  const [passVisible, setPassVisible] = useState(false);

  const handlePassVisibility = () => {
    setPassVisible(!passVisible);
  };

  return (
    <div className="w-full flex flex-col outline-none duration-200">
      {label && (
        <label className="inline-block mb-1 pl-1 text-gray-800" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={passVisible ? "text" : type}
          className={`px-3 py-2 rounded-lg border border-gray-200 focus:bg-gray-50 text-black w-full ${
            forPassword ? "pr-10" : ""
          } ${className}`}
          ref={ref}
          id={id}
          {...props}
        />
        {forPassword && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
            onClick={handlePassVisibility}
          >
            <i className={`fa ${passVisible ? "fa-eye" : "fa-eye-slash"}`}></i>
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
