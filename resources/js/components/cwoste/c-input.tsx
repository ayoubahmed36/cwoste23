import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useId, useState } from "react";

interface CInputProps {
    className?: string;
    label?: string;
    type?: string;
    error?: string;
    icon?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    dir?: string;
}

export default function CInput({ className, label, type = "text", error, icon, placeholder, value, onChange, required, disabled, dir = "rtl", ...props }: CInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getType = () => {
        if (type === 'password') {
            if (showPassword) {
                return 'text';
            }
            return 'password';
        }
        return type;
    };

    const id = useId()
    let extraStyles = ""
    if (dir == 'ltr') extraStyles += 'text-right '
    if (icon) extraStyles += 'pe-9'

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label htmlFor={id} className={`${error ? 'text-destructive' : ''} ${disabled ? 'text-muted-foreground' : ''}`}>
                {label} {required && <span className="text-destructive ms-1">*</span>}
            </Label>
            <div className={`relative flex items-center rounded-md border focus-within:ring-1 bg-white ${error ? 'border-destructive focus-within:ring-destructive' : 'focus-within:ring-ring'}`}>
                {icon && <Icon icon={icon} className="absolute start-2 size-5 text-muted-foreground/80" />}
                <Input
                    id={id}
                    type={getType()}
                    placeholder={placeholder}
                    className={`border-0 focus-visible:ring-0 py-5.5 ${extraStyles}`}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    dir={dir}
                    {...props}
                />
                {
                    type === 'password' && (
                        <button type="button" onClick={togglePasswordVisibility} className="me-2">
                            {showPassword ? (
                                <Icon icon="lucide:eye-off" className="h-5 w-5 text-muted-foreground/80" />
                            ) : (
                                <Icon icon="lucide:eye" className="h-5 w-5 text-muted-foreground/80" />
                            )}
                        </button>
                    )
                }
            </div>
            { error && <p className="text-[0.8rem] text-destructive">{error}</p> }
        </div>
    )
}