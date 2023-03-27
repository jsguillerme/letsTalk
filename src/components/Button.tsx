import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  disabled?: boolean;
}

export function Button({ isOutlined = false, disabled = false, ...props }: ButtonProps) {
  return (
    <button 
      className="mt-4 w-full h-[50px] rounded-lg font-medium bg-brand-500 text-white flex justify-center items-center cursor-pointer border-0 hover:brightness-110 disabled:cursor-not-allowed"
      disabled={disabled}
      {...props}
    />
  )
}