import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "main" | "article";
  wide?: boolean;
};

export function Container({
  children,
  className = "",
  as: Component = "div",
  wide = false,
}: ContainerProps) {
  const widthClass = wide ? "max-w-3xl" : "max-w-2xl";

  return (
    <Component
      className={`mx-auto w-full ${widthClass} px-6 sm:px-8 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
