"use client";
import React from "react";
import { ConfigProvider } from "antd";
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2643ff",
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 48,
            boxShadow: "none",
            controlOutline: "none",
            colorBorder: "#2643ff",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
