"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { format } from "date-fns";
import IconCalendar from "../Icon/IconCalendar";
import { Calendar } from "@/components/UI/Calendar";

type Props = {
  value: any;
  onChange: (date: any) => void;
  name?: string;
};

const DatePickerForm = ({ value, onChange }: Props) => {
  return (
    <Popover className="mb-4">
      <PopoverButton
        className={
          "w-full ltr:pl-3 rtl:pr-3 text-left font-normal text-black dark:text-white flex items-center justify-between outline-none"
        }
      >
        {value ? format(value, "PPP") : <span>Pick a date</span>}
        <IconCalendar className="ltr:ml-auto rtl:mr-auto h-4 w-4 opacity-50" />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col bg-white">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverPanel>
    </Popover>
  );
};

export default DatePickerForm;
