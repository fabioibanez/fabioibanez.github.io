import type { Metadata } from 'next';

const TARGET = 'https://ide.fabioibanez.com';

// Static-export-friendly redirect. next/redirect would only fire at request time,
// so for `output: 'export'` we use meta-refresh + a visible fallback link.
export const metadata: Metadata = {
  title: 'Redirecting to ide.fabioibanez.com',
  alternates: { canonical: TARGET },
  robots: { index: false, follow: false },
};

export default function IdeRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <p>
        Redirecting to <a href={TARGET}>{TARGET}</a>…
      </p>
    </>
  );
}
