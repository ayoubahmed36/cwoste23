import { useId } from "react"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface InputSelectDateProps {
    label: string
    value?: string
    onChange?: (value: string) => void;
    error?: string;
    required?: boolean;
}

export default function InputSelectDate({ label, value, onChange, error, required }: InputSelectDateProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const id = useId()

    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor={id}>{label} {required && <span className="text-destructive">*</span>}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={id}
                        className={`h-auto w-full px-3 py-3 justify-between font-normal text-muted-foreground bg-white ${error ? 'border-destructive' : ''}`}
                    >
                        {date ? date.toLocaleDateString() : "اختر تاريخ الميلاد"}
                        <ChevronDownIcon className="text-muted-foreground/50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                            onChange?.(date?.toLocaleDateString() || '')
                        }}
                    />
                </PopoverContent>
            </Popover>
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
