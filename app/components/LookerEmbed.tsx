// components/LookerEmbed.tsx

const LookerEmbed = () => {
  return (
    <div className="w-full flex justify-center mt-8">
      <iframe
        width="1000"
        height="600"
        src="https://lookerstudio.google.com/embed/reporting/88bd1cc6-e5b7-4cb0-b662-fad0684f6eb7/page/p_invm8hnsvc"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
};

export default LookerEmbed;
