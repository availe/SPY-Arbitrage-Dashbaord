"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { QRCodeCanvas } from "qrcode.react";

const SharePage: React.FC = () => {
  const url = "https://spy-arbitrage-dashboard.vercel.app";
  const isSmallScreen = useMediaQuery("(max-width: 639px)");
  const qrSize = isSmallScreen ? 200 : 400;

  return (
    <div className="flex flex-col h-[85vh] items-center justify-center gap-4">
      <QRCodeCanvas value={url} size={qrSize} />
      <p className="text-center px-2">{url}</p>
    </div>
  );
};

export default SharePage;
