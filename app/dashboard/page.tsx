// /dashboard/page.tsx

"use client"; // Assuming LookerEmbed uses client-side features

import LookerEmbed from "../components/LookerEmbed";

export default function DashboardPage() {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">
        Advanced Dashboard (Looker Studio)
      </h2>
      <LookerEmbed />
    </section>
  );
}
