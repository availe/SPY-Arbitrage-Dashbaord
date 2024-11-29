"use client";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const SharePage: React.FC = () => {
  const url =
    "https://spy-arbitrage-dashboard.vercel.app";
  const [qrSize, setQrSize] = useState(window.innerWidth < 640 ? 200 : 400);

  useEffect(() => {
    const updateQrSize = () => {
      setQrSize(window.innerWidth < 640 ? 200 : 400);
    };

    window.addEventListener("resize", updateQrSize);

    updateQrSize();

    return () => {
      window.removeEventListener("resize", updateQrSize);
    };
  }, []);

  return (
    <div className="flex flex-col h-[85vh] items-center justify-center gap-4">
      <QRCodeCanvas value={url} size={qrSize} />
      <p className="text-center px-2">{url}</p>
    </div>
  );
};

export default SharePage;
