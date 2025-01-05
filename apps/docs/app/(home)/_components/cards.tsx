"use client";

import { Globe as GlobeIcon, Braces, Layers, Zap } from "@rehooks/ui/icons";
import { Retro, Marquee, Text } from "@rehooks/ui/components";
import { cn, hooks } from "@rehooks/utils";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.145, 0.388, 0.922],
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.04 },
        { location: [40.7128, -74.006], size: 0.04 },
        { location: [52.7128, -242.831], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={cn("pointer-events-none transform-gpu", className)}
    />
  );
};

export const features = [
  {
    Icon: GlobeIcon,
    name: "Open-Source Codebase",
    description:
      "Rehooks is an open-source project, to expand OSS communities.",
    className:
      "lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-2 rounded-t-2xl lg:rounded-tl-2xl lg:rounded-tr-none border-b-[0.5px] border-r-[1px] lg:border-r-[0.5px] border-t-[1px] border-l-[1px]",
    background: (
      <Globe className="absolute -bottom-80 -right-10 [mask-image:linear-gradient(to_top,transparent_60%,#000_100%)] md:-bottom-72 md:-right-10" />
    ),
  },
  {
    Icon: Braces,
    name: "TypeScript Support",
    description:
      "Rehooks is written in TypeScript, ensuring type safety and maintainability throughout the codebase.",
    className:
      "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-2 lg:rounded-br-2xl lg:rounded-tr-none border-b-[0.5px] lg:border-b-[1px] border-r-[1px] border-t-[0.5px] border-l-[1px] lg:border-l-[0.5px]",
    background: <Text text="<T>" className="absolute -top-16" />,
  },
  {
    Icon: Layers,
    name: "Variety of Hooks",
    description:
      "Rehooks offers a diverse variety of powerful hooks for different use cases, to efficiently implement functionality in components.",
    className:
      "lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:rounded-bl-2xl border-b-[1px] lg:border-r-[0.5px] border-t-[0.5px] border-l-[1px] lg:rounded-bl-2xl border-b-[0.5px] lg:border-b-[1px] border-r-[1px] border-t-[0.5px] border-l-[1px]",
    background: (
      <>
        <Marquee
          pauseOnHover
          className="absolute top-10 h-64 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] lg:rounded-bl-2xl"
        >
          {hooks.map((hook, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-44 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-neutral-950/[.1] bg-neutral-950/[.01] hover:bg-neutral-950/[.05]",
                "dark:border-neutral-50/[.1] dark:bg-neutral-50/[.10] dark:hover:bg-neutral-50/[.15]",
                "transform-gpu transition-all duration-300 ease-in-out",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                    {hook.title}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">
                {hook.description}
              </blockquote>
            </figure>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white dark:from-neutral-950"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white dark:from-neutral-950"></div>
      </>
    ),
  },
  {
    Icon: Zap,
    name: "Performant & Reusability",
    description:
      "Crafted with SOLID principles, ensuring type-safety and maintainability throughout the codebase.",
    className:
      "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-1 rounded-b-2xl lg:rounded-br-none lg:rounded-tr-2xl lg:rounded-bl-none border-b-[1px] lg:border-b-[0.5px] border-r-[1px] border-t-[1px] border-l-[1px] lg:border-l-[0.5px]",
    background: (
      <Retro
        angle={15}
        cellSize={75}
        darkLineColor="#666666"
        lightLineColor="#000000"
        className="absolute inset-0"
      />
    ),
  },
];
