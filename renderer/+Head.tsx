import { THEME_KEY_COOKIE } from "@/shared/components/theme/theme.model";

export default function HeadDefault() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="icon" href="/logo_no_bg.png" />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const c = document.cookie.split('; ').find(row => row.startsWith('${THEME_KEY_COOKIE}='))
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