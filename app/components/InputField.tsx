import React from "react";

interface Props {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
}

export default function InputField({ name, type, label, placeholder }: Props) {
  return (
    <div className="relative mb-6 text-red-600">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="peer block min-h-[auto] w-full rounded px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-red-600 dark:placeholder:text-red-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-red-600 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-red-600 dark:peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
}
