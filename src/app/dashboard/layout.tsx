import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body>
                <div className="main flex">
                    <div className="sidebarWrapper w-[20%] h-screen">
                        <Sidebar />
                    </div>
                    <div className="rightSideContent w-[80%]">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
