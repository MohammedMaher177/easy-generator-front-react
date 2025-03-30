import LinePic from '../LinePic';
import { InputType } from '@/util/interfaces';
import CustomField from './CustomField';

type Props = {
    name: string;
    type?: InputType;
};

export default function InputWRapper({ name, type = 'text' }: Props) {
    return (
        <div className={`mt-2 flex flex-col justify-center w-full items-center `}>
            <CustomField name={name} type={type} />

            <LinePic />
        </div>
    );
}
