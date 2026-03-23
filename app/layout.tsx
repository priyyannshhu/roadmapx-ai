// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import {
//   ClerkProvider,
//   SignedIn,
//   UserButton,
// } from "@clerk/nextjs";
// import "./globals.css";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "RoadmapX",
//   description:
//     "Your AI-powered career guide. Get personalized 12-month plans, track progress, and chat with Priyanshu, your 24/7 career assistant.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider publishableKey="pk_test_YXB0LWdvb3NlLTYuY2xlcmsuYWNjb3VudHMuZGV2JA">
//       <html lang="en">
//         <body
//           className={`${poppins.variable} font-poppins antialiased bg-background text-foreground`}
//         >
//           <SignedIn>
//             <header className="border-b border-border bg-card/60 backdrop-blur-sm">
//               <div className="mx-auto flex w-full max-w-[1440px] items-center justify-end gap-2 px-6 py-3 sm:px-10 lg:px-16">
//                 <UserButton
//                   appearance={{
//                     elements: {
//                       avatarBox: "w-8 h-8",
//                     },
//                   }}
//                 />
//               </div>
//             </header>
//           </SignedIn>
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RoadmapX",
  description:
    "Your AI-powered career guide. Get personalized 12-month plans, track progress, and chat with Priyanshu, your 24/7 career assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey="pk_test_YXB0LWdvb3NlLTYuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang="en">
        <body
          className={`${poppins.variable} font-poppins antialiased bg-gray-50 text-gray-900`}
        >
          <SignedIn>
            <header className="border-b border-gray-200 bg-white shadow-sm">
              <div className="mx-auto flex w-full max-w-[1440px] items-center justify-end gap-2 px-6 py-3 sm:px-10 lg:px-16">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            </header>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
