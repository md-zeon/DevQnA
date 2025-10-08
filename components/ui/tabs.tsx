"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string;
  setValue: (v: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

// Root
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
}

export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// List
export const TabsList = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Trigger
interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = ({
  value,
  className,
  children,
  ...props
}: TabsTriggerProps) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used inside <Tabs>");
  const { value: activeValue, setValue } = ctx;
  const isActive = value === activeValue;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const list = e.currentTarget.closest("[role='tablist']");
    if (!list) return;
    const triggers = Array.from(
      list.querySelectorAll("[role='tab']")
    ) as HTMLButtonElement[];
    const index = triggers.indexOf(e.currentTarget);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      triggers[(index + 1) % triggers.length]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      triggers[(index - 1 + triggers.length) % triggers.length]?.focus();
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Content
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = ({
  value,
  className,
  children,
  ...props
}: TabsContentProps) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used inside <Tabs>");
  const { value: activeValue } = ctx;
  const isActive = value === activeValue;

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {isActive ? children : null}
    </div>
  );
};
