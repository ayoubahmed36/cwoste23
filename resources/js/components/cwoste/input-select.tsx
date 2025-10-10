import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface InputSelectProps {
	options: string[]
	label: string
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string
	error?: string;
	required?: boolean;
}

export default function InputSelect({ options, label, value, onChange, placeholder, error, required }: InputSelectProps) {
	const id = useId()
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor={id}>{label} {required && <span className="text-destructive">*</span>}</Label>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger id={id} aria-invalid={error ? true : false} className="h-auto px-4 py-3 bg-white">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
				</SelectContent>
			</Select>
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
