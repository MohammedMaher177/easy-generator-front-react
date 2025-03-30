import { beautifyText } from '@/util/util';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { useState } from 'react';
import IconLockDots from '../Icon/IconLockDots';
import IconEye from '../Icon/IconEye';
import DatePickerForm from './date-picker';

interface CustomFieldProps {
    name: string;
    type: string;
}

export default function CustomField({ type, name }: CustomFieldProps) {
    const [field, meta] = useField(name);
    const [inputType, setinputType] = useState(type);
    const { setFieldValue } = useFormikContext();

    return (
        <div className="flex flex-col gap-2 w-full max-w-md my-2 relative mb-4">
            <label htmlFor={name} className="text-left font-inter font-semibold text-lg leading-[34px] tracking-normal text-[#030816] opacity-100">
                {beautifyText(name)}
            </label>
            {type === 'date' ? (
                <DatePickerForm onChange={(e) => setFieldValue(name, new Date(e)?.toISOString())} value={field.value} />
            ) : (
                <div className="relative w-full">
                    <input
                        {...field}
                        name={name}
                        type={inputType}
                        placeholder={beautifyText(name)}
                        className={`w-full pr-10 rounded px-2 mb-4 text-dark font-bold h-14  ma:text-ba/se outline-none font-medium leading-snug border ${
                            meta.touched && meta.error ? 'border border-red-500' : meta.touched ? 'border border-success' : ''
                        }`}
                    />
                    {type === 'password' && (
                        <span className="absolute end-4 top-1/3 -translate-y-1/2 cursor-pointer" onClick={() => setinputType((prev) => (prev === 'password' ? 'text' : 'password'))}>
                            {inputType === 'password' ? <IconEye fill={true} /> : <IconLockDots fill={true} />}
                        </span>
                    )}
                </div>
            )}
            <ErrorMessage component={'div'} className="text-red-500 text-sm px-4 absolute -bottom-2" name={name} />
        </div>
    );
}
