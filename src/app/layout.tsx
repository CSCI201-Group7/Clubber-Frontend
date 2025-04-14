import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
            </head>
            <body className={`antialiased w-screen h-screen relative grid`}>{children}</body>
        </html>
    );
}
