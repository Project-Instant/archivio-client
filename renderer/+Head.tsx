export default function HeadDefault() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="icon" href="/logo_no_bg.png" />
      {import.meta.env.DEV && (
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"></script>
      )}
    </>
  );
}