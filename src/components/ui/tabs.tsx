"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
}
const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  value,
  onValueChange,
  defaultValue,
  className,
  children,
  ...props
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const value_ = value ?? internal;
  const setValue = React.useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [value, onValueChange]
  );
  return (
    <TabsContext.Provider value={{ value: value_, setValue }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 p-1",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  className,
  ...props
}: { value: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-xs font-medium transition-colors",
        active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
