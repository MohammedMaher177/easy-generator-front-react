import * as React from 'react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className="p-0 md:p-3"
            classNames={{
                months: 'w-full  space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-current  bg-transparent hover:text-primary-foreground',
                nav_button_previous: 'absolute left-2',
                nav_button_next: 'absolute right-2',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'flex-1 text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full gap-1 mt-2',
                cell: 'flex-1 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:rounded-md focus-within:relative focus-within:z-20',

                day: 'w-full h-10 rounded  p-0 font-normal aria-selected:opacity-100 bg-transparent text-current hover:text-primary',

                day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground',
                day_outside: 'text-muted-foreground opacity-50',
                day_disabled: 'text-muted-foreground opacity-50',
                day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
                ...classNames,
            }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
