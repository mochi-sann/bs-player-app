import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const centerVariants = cva("flex justify-center items-center", {
  variants: {},
  defaultVariants: {},
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof centerVariants> {
  asChild?: boolean;
}

const Center = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(centerVariants({ className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Center.displayName = "Center";

export { Center as Center, centerVariants as centerVariants };
