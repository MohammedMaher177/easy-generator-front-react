type Props = {
  checked: boolean;
  onChange: () => void;
};

export default function ToggleActive({ checked, onChange }: Props) {
  return (
    <div className="flex w-fit justify-center items-center ltr:rounded-md rtl:rounded-md px-3 font-semibold ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
      <label className="w-7 h-4 relative cursor-pointer mb-0">
        <input
          type="checkbox"
          onChange={onChange}
          checked={checked}
          className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer disabled:bg-purple-500 disabled:text-gray-200 disabled:cursor-not-allowed"
          id="custom_switch_checkbox1"
        />
        <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-purple-500 peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
      </label>
    </div>
  );
}
