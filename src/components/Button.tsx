import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  disabled?: boolean;
}

export function Button({ isOutlined = false, disabled = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`mt-4 w-full h-[50px] rounded-lg font-medium flex justify-center items-center cursor-pointer hover:brightness-110 disabled:cursor-not-allowed ${isOutlined ? 'border-brand-500 text-brand-500 border hover:bg-brand-500 hover:text-white transition-all' : 'bg-brand-500 text-white border-0'}`}
      disabled={disabled}
      {...props}
    />
  )
}