import localFont from "next/font/local";
import "./globals.css";

const bootzyReg = localFont({
  src: "./fonts/bootzy-regular.woff2",
  variable: "--bootzy-regular",
  weight: "500",
});

export const metadata = {
  title: "Complicit*Cullen",
  description: "COMPLICIT*",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bootzyReg.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
