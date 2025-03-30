import { ChangeEvent, useState } from 'react';
import { Button } from '@headlessui/react';
import IconPlus from '../Icon/IconPlus';
import IconRefresh from '../Icon/IconRefresh';
import Search from './Search';

type Props = {
    lable?: string;
    handleSubmit: (value: string) => void;
    handleOpenFilter?: () => void;
    handleRefresh: () => void;
    handleOpenCreate?: () => void;
    hanldeSearchChange?: (value: string) => void;
    BTNs?: {
        label: string;
        onClick: () => void;
    }[];
};

export default function Header({ handleSubmit, handleOpenFilter, handleOpenCreate, handleRefresh, hanldeSearchChange, lable, BTNs = [] }: Props) {
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        hanldeSearchChange?.(e.target.value);
    };

    const handleFormSubmit = () => {
        handleSubmit(searchInput);
    };

    return (
        <div className="w-full flex justify-between items-start lg:items-end mb-4 flex-col lg:flex-row ">
            <div className="section-1 mb-2">
                {lable && <h2 className="font-semibold text-[25px] leading-[30px] text-[#384252] tracking-normal mb-2">{lable}</h2>}
                <Search handleChange={handleChange} handleSubmit={handleFormSubmit} handleOpenFilter={handleOpenFilter} />
            </div>
            <div className="section-2 flex gap-2">
                <Button onClick={() => handleRefresh()}>
                    <IconRefresh className="w-6 h-6 text-purple-500" />
                </Button>

                {BTNs.map(({ label, onClick }) => (
                    <Button key={label} onClick={onClick} className="rounded-md bg-purple-500 border-none flex gap-2 items-center btn btn-primary">
                        <IconPlus />
                        {label}
                    </Button>
                ))}

                {handleOpenCreate && (
                    <Button onClick={handleOpenCreate} className="rounded-md bg-purple-500 border-none flex gap-2 items-center btn btn-primary">
                        <IconPlus className="w-6 h-6" />
                        Add New
                    </Button>
                )}
            </div>
        </div>
    );
}
