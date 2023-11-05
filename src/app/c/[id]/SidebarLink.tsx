'use client';

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SidebarLink({ children, href }: { children: ReactNode, href: string }) {
    const path = usePathname();
    return <Link href={href} className="rt-reset rt-BaseButton rt-Button rt-r-size-2 rt-variant-soft" style={{ backgroundColor: path == href ? 'var(--accent-a2)' : 'inherit' }}>
            {children}
    </Link>
}