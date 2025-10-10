"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useId } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
    if (!date) return ""
  
    return date.toLocaleDateString("ar-DZ", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

interface DatePickerProps {
    label: string
    value?: Date | undefined
    onChange?: (date: Date | undefined) => void
    error?: string;
    required?: boolean;
}

export default function InputDate({ value, onChange, label, error, required }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value)
    const [inputValue, setInputValue] = React.useState(formatDate(value))
    const id = useId()

    // Sync internal state with external value changes
    React.useEffect(() => {
        setInputValue(formatDate(value))
        setMonth(value)
    }, [value])

    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor={id}>{label} {required && <span className="text-destructive">*</span>}</Label>
            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={inputValue}
                    className="bg-background ps-10  h-auto px-4 py-3 text-muted-foreground"
                    aria-invalid={error ? true : false}
                    autoComplete="off"
                    onChange={(e) => {
                        const date = new Date(e.target.value)
                        setInputValue(e.target.value)
                        if (isValidDate(date)) {
                            setMonth(date)
                            onChange?.(date) // notify parent
                        }
                    }}

                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={value}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                setInputValue(formatDate(date))
                                setOpen(false)
                                onChange?.(date) // notify parent
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {
                error && (
                   <p className={`mt-2 text-xs ${error ? 'text-destructive' : ''}`} role="alert" aria-live="polite">
                      {error}
                   </p>
                )
            }
        </div>
    )
}