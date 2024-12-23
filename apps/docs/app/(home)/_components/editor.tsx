"use client";

import { BorderBeam, CodeBlock } from "@rehooks/ui/components";
import { Wrench, Settings } from "@rehooks/ui/icons";
import { useState } from "react";

const hookCode = `export function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = () => {
    setValue((x) => !x);
  };

  // ...
};`;

const settingCode = `export function Settings() {
  const [isOn, toggle, setToggle] = useToggle(false);
  return (
    <div>
      <p>Current state: {isOn ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setToggle(true)}>Turn On</button>
      <button onClick={() => setToggle(false)}>Turn Off</button>
    </div>
  );
};`;

const hooksList = [
  { name: "Product", component: "useSessionStorage" },
  { name: "Dropdown", component: "useEventCallback" },
  { name: "Command", component: "useThrottle" },
  { name: "Table", component: "useFocus" },
  { name: "List", component: "useFetch" },
];

const componentsList = [
  { name: "useSessionStorage", component: "Dropdown" },
  { name: "useEventCallback", component: "Command" },
  { name: "useThrottle", component: "Product" },
  { name: "useFocus", component: "Table" },
  { name: "useFetch", component: "List" },
];

export function Editor() {
  const [activeTab, setActiveTab] = useState("hook");
  const list = activeTab === "hook" ? hooksList : componentsList;

  return (
    <div className="text-fd-foreground border-fd-border/50 relative flex h-auto max-w-[350px] flex-col overflow-hidden rounded-2xl border bg-neutral-950 shadow-[0_0px_100px_rgba(91,33,182,.15)] sm:max-w-full">
      <div className="flex select-none border-neutral-800">
        <TabButton
          active={activeTab === "hook"}
          onClick={() => setActiveTab("hook")}
        >
          <span className="flex items-center gap-2">
            <Wrench className="size-4" />
            useToggle.ts
          </span>
        </TabButton>
        <TabButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          <span className="flex items-center gap-2">
            <Settings className="size-4" />
            Settings.tsx
          </span>
        </TabButton>
      </div>

      <div className="flex w-full flex-1 flex-col md:flex-row">
        <div className="min-h-[300px] max-w-[600px] flex-1 overflow-auto p-4">
          <div className="text-fd-muted-foreground mb-2 select-none rounded-md bg-neutral-900 p-2 font-mono text-sm tracking-tight">
            {activeTab === "hook"
              ? "src > hooks > useToggle"
              : "src > components > Settings"}
          </div>
          <CodeBlock className="text-sm md:text-base lg:text-lg">
            {activeTab === "hook" ? hookCode : settingCode}
          </CodeBlock>
        </div>

        <div className="max-w-full select-none border-t border-neutral-800 p-4 md:border-l md:border-t-0 lg:w-[300px]">
          <div className="space-y-2">
            {list.map((stat) => {
              return <Stat key={stat.name} {...stat} />;
            })}
          </div>
        </div>
      </div>
      <BorderBeam className="absolute inset-0 z-10 rounded-2xl" duration={4} />
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center border-b border-neutral-800 px-4 py-2 text-sm font-medium ${className} ${
        active
          ? "border-b-violet-500 bg-neutral-900/80 text-white"
          : "text-fd-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ name, component }: { name: string; component?: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-x-4">
        <span className="text-base font-medium text-white">{component}</span>
      </div>
      <div className="flex flex-row text-white">
        <span className="mr-2 text-sm text-violet-500">→</span>
        <span className="flex-1 text-sm text-white">{name}</span>
      </div>
    </div>
  );
}
