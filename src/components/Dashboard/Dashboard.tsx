import ReportsSnapshot from '../reports-snapshot';

type Props = {};

export default function Dashboard({}: Props) {
    return (
        <div className="w-full">
            <div className="flex items-center flex-wrap justify-between gap-4">
                <div className="text-2xl font-medium text-default-800 ">Analytics Dashboard</div>
            </div>

            <div className="flex justify-center w-full gap-6 items-center">
                <ReportsSnapshot />
            </div>
        </div>
    );
}
