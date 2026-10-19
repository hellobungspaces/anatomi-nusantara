"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CatalogHouse {
  id: string;
  tab: string;
  place: string;
  title: string;
  lead: string;
  layers: string[];
}

/**
 * Daftar rumah dengan pratinjau di sisi kanan (layar lebar).
 * Gerak hanya dipakai untuk pergantian pratinjau, supaya terlihat bahwa isinya berubah.
 */
export function HouseCatalog({ houses }: { houses: CatalogHouse[] }) {
  const [activeId, setActiveId] = useState(houses[0].id);
  const reduce = useReducedMotion();
  const active = houses.find((h) => h.id === activeId) ?? houses[0];

  return (
    <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_26rem]">
      <ol className="divide-y divide-border border-y border-border">
        {houses.map((h, i) => (
          <li key={h.id}>
            <Link
              href={`/rumah/${h.id}`}
              onMouseEnter={() => setActiveId(h.id)}
              onFocus={() => setActiveId(h.id)}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto]"
            >
              <span className="text-sm tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-display text-3xl font-bold leading-tight tracking-tight transition-colors sm:text-4xl",
                    h.id === active.id ? "text-primary" : "text-foreground",
                  )}
                >
                  {h.tab}
                </span>
                <span className="mt-1 block text-muted-foreground lg:hidden">
                  {h.title}
                </span>
              </span>
              <span className="col-start-2 mt-1 text-sm text-muted-foreground sm:col-start-3 sm:mt-0 sm:text-right sm:text-base">
                {h.place}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <aside
        aria-live="polite"
        className="hidden lg:block lg:sticky lg:top-8 lg:self-start"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm font-semibold text-primary">
              Rumah adat {active.place}
            </p>
            <h3 className="mt-1 text-2xl font-bold leading-snug">{active.title}</h3>
            <p className="mt-3 text-[0.97rem] leading-relaxed">{active.lead}</p>
            <p className="mt-5 text-sm font-semibold text-muted-foreground">
              {active.layers.length} bagian yang bisa dibuka
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {active.layers.join(", ")}.
            </p>
            <Link
              href={`/rumah/${active.id}`}
              className={cn(buttonVariants(), "mt-6 h-11 px-5 text-[0.95rem]")}
            >
              Buka model {active.tab}
            </Link>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
