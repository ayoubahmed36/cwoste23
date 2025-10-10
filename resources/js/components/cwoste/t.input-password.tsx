"use client"

import { useId, useState } from "react"
import { LuEye, LuEyeOff } from "react-icons/lu";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputSideIconProps {
    label: string
    value?: string;
    onChange?: (value: string) => void;
    placeholder: string
    icon?: React.ReactNode
    error?: string;
    required?: boolean;
}

export default function InputPassword({ label, value, onChange, placeholder, icon, error, required }: InputSideIconProps) {
    const id = useId()
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor={id}>{label} {required && <span className="text-destructive">*</span>}</Label>
            <div className="relative">
                <Input
                    id={id}
                    className="peer pe-9 h-auto px-4 py-3 bg-white"
                    placeholder={placeholder}
                    type={isVisible ? "text" : "password"}
                    aria-invalid={error ? true : false}
                    value={value || ""}
                    onChange={(e) => onChange?.(e.target.value)}
                />
                <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                >
                    {isVisible ? (
                        <LuEyeOff size={19} aria-hidden="true" />

                    ) : (
                        <LuEye size={19} aria-hidden="true" />
                    )}
                </button>
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
