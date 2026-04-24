import { ButtonHTMLAttributes, forwardRef } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ strength = 0.3, children, ...props }, _ref) => {
    const wrapperRef = useMagnetic<HTMLSpanElement>(strength);
    return (
      <span ref={wrapperRef} className="inline-block will-change-transform">
        <button {...props}>{children}</button>
      </span>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
