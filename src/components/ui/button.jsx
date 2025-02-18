import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white border border-gray-600 rounded-lg shadow-md px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-900 hover:border-gray-500 hover:shadow-xl",
        destructive:
          "bg-red-500 text-white border border-red-600 shadow-sm transition-all duration-300 ease-in-out hover:bg-red-600 hover:border-red-700 hover:shadow-md",
        outline:
          "border border-gray-300 bg-white text-black shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-400 hover:shadow-md",
        secondary:
          "bg-gray-100 text-black border border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-400 hover:shadow-md",
        ghost:
          "text-black transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm",
        link:
          "text-blue-600 underline-offset-4 transition-all duration-300 ease-in-out hover:text-blue-700 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6 text-base",
        icon: "h-9 w-9 flex items-center justify-center",
      },
    }
    ,
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
