
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./loader";


export default function GlobalLoader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); 
        return () => clearTimeout(timer);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <Loader />
        </div>
    );
}
