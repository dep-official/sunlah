import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sfe3gei.css" />
      </head>
      <body className="px-8 pt-10 ">
          {children}
      </body>
    </html>
  );
}
