import  { memo, useMemo } from 'react';

type Props = {
    data: any[];
    itemKeyPrefix: string;
    itemLabelKey: string;
};

const COLOR_STYLES = [
    {
        card: 'rounded-lg bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70',
        dot: 'bg-primary/50 ring-primary/20 dark:bg-primary dark:ring-primary/40',
        text: 'text-primary/80 dark:text-primary-foreground',
    },
    {
        card: 'rounded-lg bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500',
        dot: 'bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400',
        text: 'text-warning/80 dark:text-primary-foreground',
    },
    {
        card: 'rounded-lg bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500',
        dot: 'bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400',
        text: 'text-success/80 dark:text-primary-foreground',
    },
    {
        card: 'rounded-lg bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500',
        dot: 'bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400',
        text: 'text-info/80 dark:text-primary-foreground',
    },
];

type DataCardProps = {
    label: string;
    count: number;
    colorStyle: {
        card: string;
        dot: string;
        text: string;
    };
};
const DataCard = memo(({ label, count, colorStyle }: DataCardProps) => (
    <div
        className={`flex flex-col gap-3 p-4 overflow-hidden items-start relative
      before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1
      before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground
      before:hidden data-[state=active]:shadow-none data-[state=active]:before:block ${colorStyle.card}`}
    >
        <span className={`h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 ${colorStyle.dot}`}></span>
        <span className={`text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10 ${colorStyle.text}`}>{label}</span>
        <span className={`text-lg font-semibold ${colorStyle.text}`}>{count}</span>
    </div>
));

export default function DataGrid({ data, itemKeyPrefix, itemLabelKey }: Props) {
    const itemsWithStyles = useMemo(() => {
        return data?.map((item, index) => ({
            ...item,
            colorStyle: COLOR_STYLES[index % COLOR_STYLES.length],
        }));
    }, [data]);

    if (!data || data.length === 0) {
        return <p className="p-4 text-default-500">No data available.</p>;
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-start w-full bg-transparent h-full">
            {itemsWithStyles.map((item, index) => (
                <DataCard key={`${itemKeyPrefix}-${index}`} label={item[itemLabelKey]} count={item.count} colorStyle={item.colorStyle} />
            ))}
        </div>
    );
}
