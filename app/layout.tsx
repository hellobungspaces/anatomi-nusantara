import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anatomi Rumah Nusantara",
  description:
    "Model 3D tujuh rumah adat, dari Nias sampai Papua. Putar, bongkar per lapis, dan baca fungsi tiap bagiannya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
