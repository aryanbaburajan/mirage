"use client";

import { cn } from "@/lib/utils";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

const useAutoResizeTextarea = (
  ref: ForwardedRef<HTMLTextAreaElement>,
  autoResize: boolean
) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textAreaRef.current!);

  useEffect(() => {
    const ref = textAreaRef?.current;

    const updateTextareaHeight = () => {
      if (ref && autoResize) {
        ref.style.height = "auto";
        ref.style.height = ref?.scrollHeight + "px";
      }
    };

    updateTextareaHeight();

    ref?.addEventListener("input", updateTextareaHeight);

    return () => ref?.removeEventListener("input", updateTextareaHeight);
  }, []);

  return { textAreaRef };
};

export interface AutoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const AutoTextarea = forwardRef<HTMLTextAreaElement, AutoTextareaProps>(
  ({ className, autoResize = false, ...props }, ref) => {
    const { textAreaRef } = useAutoResizeTextarea(ref, autoResize);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={textAreaRef}
        {...props}
      />
    );
  }
);

AutoTextarea.displayName = "AutoTextarea";

export { AutoTextarea };
