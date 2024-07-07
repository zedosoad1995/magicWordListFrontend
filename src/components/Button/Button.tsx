import { useEffect, useRef, useState } from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ isLoading, children = false, ...props }: IButton) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const [nonLoadingWidth, setNonLoadingWidth] = useState<number>();

  useEffect(() => {
    if (!ref.current) return;

    setNonLoadingWidth(ref.current.offsetWidth);
  }, [ref, children]);

  return (
    <button
      disabled={isLoading}
      ref={ref}
      style={{ minWidth: isLoading ? nonLoadingWidth : "auto" }}
      {...props}
    >
      {isLoading ? "..." : children}
    </button>
  );
};
