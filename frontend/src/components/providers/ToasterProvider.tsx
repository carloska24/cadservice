"use client";

import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster 
      position="top-right"
      expand={false}
      richColors
      closeButton
      theme="light"
      className="toaster-custom-layer"
      style={{ 
        zIndex: 9999, // Ensure it's above all modals (even z-[100])
      }}
      toastOptions={{
        style: {
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
      }}
    />
  );
}
