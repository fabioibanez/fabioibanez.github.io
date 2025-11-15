export const metadata = {
  title: 'Fabio Ibanez',
  description: 'Personal webpage',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
