type Props = { message: string };

export default function ErrorState({ message }: Props) {
    return (
        <div className="w-full p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 font-medium">Error: {message}</p>
        </div>
    );
}
