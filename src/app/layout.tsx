import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
const playfair=Playfair_Display({subsets:["latin"],variable:"--font-playfair",display:"swap"});
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
export const metadata:Metadata={title:"Aurelia Homes — Spaces That Rise Above",description:"Considered architecture and premium residences by Aurelia Homes, Mumbai.",metadataBase:new URL("https://aureliahomes.in"),openGraph:{title:"Aurelia Homes — Spaces That Rise Above",description:"Considered architecture. A more beautiful way to live.",type:"website",images:["/media/hero-poster.jpg"]},twitter:{card:"summary_large_image",title:"Aurelia Homes",description:"Spaces That Rise Above",images:["/media/hero-poster.jpg"]},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${playfair.variable} ${inter.variable}`}><body>{children}</body></html>}
