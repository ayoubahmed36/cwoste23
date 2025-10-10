"use client"

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Button, Group, Input, NumberField } from "react-aria-components"
import { Label } from "@/components/ui/label"

import { useId } from "react";

interface InputNumberProps {
	label: string;
	value?: number;
	onChange?: (value: number) => void;
	error?: string;
	required?: boolean;
}

export default function InputNumber({ label, value, onChange, error, required }: InputNumberProps) {
	const id = useId()
	return (
		<NumberField
			defaultValue={0}
			value={value}
			onChange={onChange}
			minValue={0}
			maxValue={20}
			step={1}
		>
			<div className="flex flex-col gap-2">
				<Label htmlFor={id}>{label} {required && <span className='text-destructive'>*</span>}</Label>
				<Group aria-invalid={!!error} className="bg-white border-input doutline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:has-aria-invalid:ring-destructive/20 dark:focus-within:has-aria-invalid:ring-destructive/40 focus-within:has-aria-invalid:border-destructive relative inline-flex h-11 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 focus-within:ring-[3px] aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20">
					<Input id={id} aria-invalid={!!error} className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums border-none outline-none" />
					<div className="flex h-[calc(100%+2px)] flex-col">
						<Button
							slot="increment"
							className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							<ChevronUpIcon size={12} aria-hidden="true" />
						</Button>
						<Button
							slot="decrement"
							className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							<ChevronDownIcon size={12} aria-hidden="true" />
						</Button>
					</div>
				</Group>
			</div>
			{
				error && (
					<p className={`mt-2 text-xs ${error ? 'text-destructive' : ''}`} role="alert" aria-live="polite">
						{error}
					</p>
				)
			}
		</NumberField>
	)
}
