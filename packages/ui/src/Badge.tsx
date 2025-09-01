import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "default",
  children,
  ...props
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 ring-gray-200",
    success: "bg-green-100 text-green-800 ring-green-200",
    warning: "bg-yellow-100 text-yellow-800 ring-yellow-200",
    danger: "bg-red-100 text-red-800 ring-red-200",
    info: "bg-blue-100 text-blue-800 ring-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
