import localFont from "next/font/local";

export const fontMono = localFont({
  display: "swap",
  src: "./PaperMono-Regular.woff2",
  variable: "--font-mono",
});

export const fontSans = localFont({
  display: "swap",
  src: "./CalSansUI[MODE,wght].woff2",
  variable: "--font-sans",
  weight: "300 700",
});

export const fontHeading = localFont({
  display: "swap",
  src: "./CalSans-SemiBold.woff2",
  variable: "--font-heading",
  weight: "600",
});
