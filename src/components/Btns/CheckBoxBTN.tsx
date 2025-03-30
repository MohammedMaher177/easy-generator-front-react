import { Checkbox } from "@headlessui/react";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label : string
};

export default function CheckBoxBTN({ checked, onChange, label }: Props) {
    const x = (e: any) => {
        console.log(e);

        onChange(e);
    };
  return (
    <div className="text-wrap mb-4">
      <Checkbox
        checked={checked}
        onChange={x}
        className="group text-gray-700 block size-4 rounded border bg-white data-[checked]:bg-blue-500 flex flex-nowrap items-center pl-2 gap-4 text-nowrap"
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </Checkbox>
    </div>
  );
}
