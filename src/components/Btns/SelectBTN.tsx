import { Fragment, useState } from "react";
import { beautifyText } from "@/util/util";
import { Listbox, Transition } from "@headlessui/react";
import IconCircleCheck from "../Icon/IconCircleCheck";
import IconSearch from "../Icon/IconSearch";
import IconCaretDown from "../Icon/IconCaretDown";

type Props = {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

export default function SelectBTN({
  name,
  options,
  value,
  onChange,
  disabled,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  const handleChange = (value: string) => {
    setQuery("");
    onChange(value);
  };

  return (
    <Listbox value={value} onChange={handleChange}>
      <div className={`relative h-14 mb-8`}>
        <Listbox.Button
          disabled={disabled}
          className="relative w-full cursor-pointer h-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
        >
          <span className="block truncate text-black">
            {options.find((opt) => opt.value === value)?.label ||
              beautifyText(name)}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconCaretDown
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {/* Search Input */}
            <div className="relative px-3 py-2">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <IconSearch className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Options List */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <IconCircleCheck
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))
            ) : (
              <div className="py-2 px-4 text-gray-500 text-sm">
                No results found.
              </div>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
