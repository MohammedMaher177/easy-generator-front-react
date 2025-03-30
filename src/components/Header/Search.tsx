import { ChangeEvent, FormEvent } from 'react';
import IconSearch from '../Icon/IconSearch';
import IconMenu from '../Icon/IconMenu';

type Props = {
    handleSubmit: () => void;
    handleOpenFilter?: () => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ handleSubmit, handleChange, handleOpenFilter }: Props) {
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className="flex ">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
                <div className="w-96 max-w-full h-14 pl-4 bg-white rounded-lg justify-start items-center inline-flex">
                    <div className="relative justify-start items-center gap-2 inline-flex w-full">
                        <button type="submit" className="w-[35px] absolute h-9 pl-1.5 pr-[5px] py-1.5 rounded-lg shadow flex-col justify-center items-center inline-flex right-2">
                            <IconSearch className="text-8xl" />
                        </button>
                        <input onChange={handleChange} className="outline-none text-base font-medium leading-relaxed w-full rounded-lg" placeholder="Search.." />
                    </div>
                </div>
                {handleOpenFilter && (
                    <button
                        onClick={handleOpenFilter}
                        type="button"
                        className="w-10 h-10 px-[26px] bg-transparent dark:bg-gray-800 dark:text-dark border-4 border-gray-800 rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex"
                    >
                        <div className="w-8 h-8 relative">
                            <div className="w-full h-full dark:text-white flex justify-center items-center text-8xl">
                                <IconMenu />
                            </div>
                        </div>
                    </button>
                )}
            </form>
        </div>
    );
}
