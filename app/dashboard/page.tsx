// app/dashboard/page.tsx or wherever your dashboard lives
import LookerEmbed from "../components/LookerEmbed";

export default function DashboardPage() {
  return (
    <section className="mt-12 px-6">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <LookerEmbed />
    </section>
  );
}
