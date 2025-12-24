import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-black text-white border border-white",
    secondary: "bg-white text-black border border-black",
    destructive: "bg-red-500 text-white",
    outline: "border border-white text-white bg-transparent",
  }
  
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant],
        className
      )} 
      {...props} 
    />
  )
}

export { Badge }