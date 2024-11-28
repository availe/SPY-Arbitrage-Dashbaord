"use client";

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const SharePage: React.FC = () => {
  const url = "https://spy-arbitrage-dashboard-xe57t1ng9-availes-projects.vercel.app";
  return (
    <div className='flex flex-col h-[85vh] items-center justify-center gap-4'>
      <QRCodeCanvas value={url} size={400} />
      <p className='text-center'>{url}</p>
    </div>
  );
};

export default SharePage;
