"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Viewer 3D (public/anatomi/index.html) dalam mode embed. Viewer mengirim tinggi
 * kontennya lewat postMessage, jadi iframe mengikuti dan halaman yang di-scroll,
 * bukan iframe-nya. Sampai viewer siap, tinggi minimum menjaga layout tidak melompat.
 */
export function ViewerFrame({ id, name }: { id: string; name: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(700);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      if (e.source !== ref.current?.contentWindow) return;
      const data = e.data as { type?: string; height?: number } | null;
      if (data?.type === "anatomi:height" && typeof data.height === "number") {
        setHeight(Math.ceil(data.height));
        setReady(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setSlow(true), 10000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative" style={{ minHeight: 700 }}>
      {!ready && (
        <p
          role="status"
          className="absolute inset-x-0 top-24 text-center text-muted-foreground"
        >
          {slow
            ? "Model belum juga muncul. Periksa koneksi, lalu muat ulang halaman ini."
            : `Memuat model ${name}…`}
        </p>
      )}
      <iframe
        ref={ref}
        src={`/anatomi/index.html?embed=1#${id}`}
        title={`Model 3D ${name}`}
        scrolling="no"
        className="block w-full border-0"
        style={{ height, opacity: ready || slow ? 1 : 0 }}
      />
      <noscript>
        <p className="py-16 text-center">Model 3D membutuhkan JavaScript.</p>
      </noscript>
    </div>
  );
}
