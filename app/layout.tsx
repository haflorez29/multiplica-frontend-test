// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Rick and Morty Character Viewer",
  description: "Frontend technical test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
