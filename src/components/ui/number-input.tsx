"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function NumberInput({
  value,
  onChange,
  placeholder,
  disabled,
  readOnly,
  suffix,
  className,
}: {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className="flex h-9 w-full rounded-md border border-input bg-background/60 px-3 py-1 pr-14 text-sm tabular-nums transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 text-xs font-medium text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
}
