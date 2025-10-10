import { useId } from "react"
// import { Icon } from '@iconify/react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputSideIconProps {
   label: string
   value?: string;
   onChange?: (value: string) => void;
   placeholder?: string
   type: string
   icon?: React.ReactNode
   error?: string;
   required?: boolean;
   disabled?: boolean;
   readOnly?: boolean;
}

export default function InputIcon({ label, value, onChange, placeholder, type, icon, error, required, disabled, readOnly }: InputSideIconProps) {
   const id = useId()
   return (
      <div className="*:not-first:mt-2">
         <Label htmlFor={id} className={disabled ? 'text-muted-foreground' : ''}>{label} {required && <span className={disabled ? 'text-muted-foreground' : 'text-destructive'}>*</span>}</Label>
         <div className="relative">
            <Input id={id} className="peer pe-9 h-auto px-4 py-3 bg-white" placeholder={placeholder || ""} type={type} aria-invalid={error ? true : false} value={value || ""} onChange={(e) => onChange?.(e.target.value)} disabled={disabled} readOnly={readOnly} />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
               {icon}
            </div>
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
