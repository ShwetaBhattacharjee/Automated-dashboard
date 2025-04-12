export default function BRUnitPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">BR Unit Dashboard</h1>
      <iframe
        src="https://br-automation.vercel.app"
        className="w-full h-[80vh] border rounded-xl"
      />
    </main>
  );
}
