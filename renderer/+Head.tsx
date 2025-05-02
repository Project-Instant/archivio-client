import { cookieThemeKey } from "@/shared/components/theme/theme.model";

export default function HeadDefault() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&display=swap" rel="stylesheet" />
      <link rel="icon" href="/logo_no_bg.png" />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const c = document.cookie.split('; ').find(row => row.startsWith('${cookieThemeKey}='))
                ?.split('=')[1];
              if (c) {
                try {
                  const tp = JSON.parse(decodeURIComponent(c));
                  if (tp.data) document.body.classList.add(tp.data);
                } catch (e) { }
              }
            });
          `
        }}
      />
      {import.meta.env.DEV && (
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"></script>
      )}
    </>
  );
}