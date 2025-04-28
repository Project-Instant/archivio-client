import { cookieThemeKey } from "@/shared/components/theme/theme.model";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href="/logo_bg.png" />
      <script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      ></script>
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
    </>
  );
}