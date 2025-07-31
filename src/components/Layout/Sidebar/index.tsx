import { Home } from "lucide-react";
import Link from "next/link";
import { Ref } from "react";

import { cn } from "@/lib/utils";

interface SidebarProps {
    collapsed: boolean;
    ref: Ref<HTMLElement>;
}

export function Sidebar({ collapsed, ref }: SidebarProps) {
    const navbarLinks = [
        {
            title: "Dashboard",
            links: [
                {
                    label: "Home",
                    icon: Home,
                    path: "/",
                }
            ],
        },
    ];

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3">
                <h1 className="font-bold">
                    <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">TKS</span>
                    {!collapsed && <span className="ml-3 text-xl">Financial</span>}
                </h1>
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>{navbarLink.title}</p>
                        {navbarLink.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.path}
                                className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                            >
                                <link.icon
                                    size={22}
                                    className="flex-shrink-0"
                                />
                                {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                            </Link>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
};
