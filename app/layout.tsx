"use client";

import PublicLayout from "./(pages)/(public)/layout";
import AuthLayout from "./(pages)/(auth)/layout";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import "./globals.css";
import LayoutPage from "./(common)/_components/LayoutPage";
import { IUser } from "./(server)/database/models/User";
import Script from "next/script";
import { Suspense } from "react";
import LoadingOrUnauthenticated from "./(common)/_components/LoadingOrUnauthenticated";
import ToastContainerWrapper from "./(common)/_components/Wrappers/ToastContainerWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <html lang="vi">
      <head>
        <title>
          MyVR - Lưu giữ ký ức trong không gian thực tế ảo 3D bằng nền tảng
          WebXR
        </title>
        <meta
          name="description"
          content="MyVR là một nền tảng được thiết kế để lưu giữ ký ức trong không gian thực tế ảo 3D. Dựa trên công nghệ WebXR, cho phép bạn lưu trữ và hồi tưởng những kỷ niệm quý giá của mình trong môi trường VR chân thực nhất."
        />
        <meta name="language" content="vietnamese" />
        <meta httpEquiv="content-language" content="vi" />

        <link rel="alternate" href="https://myvr.vn/" />
        <link rel="canonical" href="https://myvr.vn/" />

        <meta property="og:image" content="/imgs/myvr_black_thumbnail.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta
          property="og:description"
          content="MyVR là một nền tảng được thiết kế để lưu giữ ký ức trong không gian thực tế ảo 3D. Dựa trên công nghệ WebXR, cho phép bạn lưu trữ và hồi tưởng những kỷ niệm quý giá của mình trong môi trường VR chân thực nhất."
        />
        <meta
          property="og:title"
          content="MyVR - Lưu giữ ký ức trong không gian thực tế ảo 3D bằng nền tảng WebXR"
        />

        {/* TODO Kien: Add other meta tags here */}
      </head>
      <body>
        <div>
          <Suspense fallback={<LoadingOrUnauthenticated status="loading" />}>
            <LayoutPage loggedIn={isLoggedIn} userInfo={data?.user as IUser}>
              {isLoggedIn ? (
                <AuthLayout>{children}</AuthLayout>
              ) : (
                <PublicLayout>{children}</PublicLayout>
              )}
            </LayoutPage>
          </Suspense>
          <ToastContainerWrapper />
        </div>
      </body>
      <Script
        src="https://cdn.delight-vr.com/latest/dl8-c5a45ae7736124b4dd5a8e67727c3c72d261ffa3.js"
        async
      />

      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SWS13KXTK7"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SWS13KXTK7');
          `}
      </Script>
    </html>
  );
}
