"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
  contentClassName?: string;
}

export function Dropdown({ trigger, children, align = "right", className, contentClassName }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center">
        {trigger}
      </button>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-[180px] rounded-md border border-border bg-card p-1 shadow-xl shadow-black/40",
            align === "right" ? "right-0" : "left-0",
            contentClassName
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
