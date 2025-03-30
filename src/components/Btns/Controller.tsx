import IconLoader from '../Icon/IconLoader';

type Props = {
    onCancel: () => void;
    onSubmit?: () => void;
    loading?: boolean;
    disabled?: boolean;
};

export default function Controller({ onCancel, loading, onSubmit, disabled }: Props) {
    return (
        <div className=" flex justify-between w-full h-full mb-4 items-center text-lg font-medium leading-6 ">
            <div className={`flex gap-4 items-center`}>
                <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>

                <button
                    type="submit"
                    onClick={onSubmit}
                    disabled={loading || disabled}
                    className={`rounded-full px-7 py-2 border-none bg-violet-700 text-white text-sm md:text-base font-semibold font-inter flex items-center justify-center
                        bg-gradient-bg transition-opacity
                        ${loading || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                >
                    {loading ? <IconLoader className="h-6 w-6 animate-spin" /> : 'Submit'}
                </button>
            </div>
        </div>
    );
}
