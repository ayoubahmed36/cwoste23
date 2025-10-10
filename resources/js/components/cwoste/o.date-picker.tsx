import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { DateInput } from "@/components/ui/datefield"
import { DateField } from "react-aria-components"
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date"

type DatePickerProps = {
    className?: string
    label?: string
    error?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    required?: boolean;
    disabled?: boolean;
}

function toCalendarDate(date: Date): CalendarDate {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

function toJSDate(calendarDate: CalendarDate | null): Date | undefined {
    if (!calendarDate) return undefined
    const { year, month, day } = calendarDate
    return new Date(year, month - 1, day)
}

export default function DatePicker({ className, label, error, value, onChange, required, disabled }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const id = React.useId()
    const [calendarValue, setCalendarValue] = React.useState<CalendarDate | null>(
        value ? toCalendarDate(value) : null
    )
    const [month, setMonth] = React.useState<Date | undefined>(
        value ? toJSDate(toCalendarDate(value)) : undefined
    )

    React.useEffect(() => {
        if (value) {
            const cd = toCalendarDate(value)
            setCalendarValue(cd)
            setMonth(toJSDate(cd))
        } else {
            setCalendarValue(null)
            setMonth(undefined)
        }
    }, [value])

    return (

        <div className={cn("flex flex-col gap-2", className)}>
            <Label htmlFor={id} className={`${error ? 'text-destructive' : ''} ${disabled ? 'text-muted-foreground' : ''}`}>
                {label} {required && <span className="text-destructive ms-1">*</span>}
            </Label>

            <div className="relative flex gap-2">
                <DateField
                    granularity="day"
                    placeholderValue={today(getLocalTimeZone())}
                    value={calendarValue || undefined}
                    onChange={(newCalendarDate) => {
                        setCalendarValue(newCalendarDate)
                        setMonth(toJSDate(newCalendarDate)) // 🟢 sync calendar when typing
                    }}
                    onBlur={() => {
                        onChange?.(toJSDate(calendarValue))
                    }}
                    className="flex-1"
                >
                    <DateInput className={ `data-input py-5.5 shadow-none bg-white ${error ? 'border-destructive data-[focus-within]:ring-destructive' : ''}` } />
                    

                </DateField>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 end-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={calendarValue ? toJSDate(calendarValue) : undefined}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(jsDate) => {
                                const cd = jsDate ? toCalendarDate(jsDate) : null
                                setCalendarValue(cd)
                                setMonth(jsDate ?? undefined)
                                onChange?.(jsDate ?? undefined)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <p className={`text-[0.8rem] ${error ? 'text-destructive' : ''}`}>{error}</p>
        </div>

    )
}
