"use client";

export default function LookerEmbed() {
  return (
    <div className="w-full h-[700px] mt-12">
      <iframe
        src="https://lookerstudio.google.com/embed/reporting/a105183c-f0b9-4929-85d1-3d54b5fd06de/page/p_invm8hnsvc"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
}
