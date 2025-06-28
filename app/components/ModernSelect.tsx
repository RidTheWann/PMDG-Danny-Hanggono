import React from 'react';

interface ModernSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder: string;
  label: string;
}

export default function ModernSelect({
  id,
  name,
  value,
  onChange,
  required = false,
  options,
  placeholder,
  label,
}: ModernSelectProps): JSX.Element {
  return (
    <div className="relative w-full group">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-blue-700 transition-all dark:text-blue-300 group-focus-within:text-blue-400"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 text-base text-gray-900 transition-all bg-white border border-gray-300 shadow-md outline-none appearance-none dark:bg-gray-700/80 dark:border-gray-600 rounded-2xl dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 focus:shadow-lg"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg
            className="w-6 h-6 text-blue-400 transition-colors group-focus-within:text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
