"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes"
import { useState } from "react";

import { ChevronsLeft, LogOut, Moon, Sun } from "lucide-react";

import { signOut } from "@/auth";
import profileImg from "@/assets/profile-image.jpg";
import { SelectLanguage } from "@/components";
import { Button } from "@/components/ui";

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export function Header({ collapsed, setCollapsed }: HeaderProps) {
    const t = useTranslations("Components.Header");

    const { theme, setTheme } = useTheme();

    const [open, setOpen] = useState(false);

    async function handleSignOut() {
        await signOut()
    }

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <Button
                    variant="ghost"
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </Button>
            </div>
            <div className="flex items-center gap-x-3">
                <Button 
                    variant="ghost"
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </Button>

                <button 
                    className="size-10 overflow-hidden rounded-full"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Abrir menu"
                >
                    <Image
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                </button>
                {open && (
                    <div className="absolute right-4 top-16 dark:bg-slate-900 border border-border rounded shadow-lg flex flex-col gap-4 p-4 z-50 min-w-[180px]">
                        <SelectLanguage />
                        <Button variant="destructive" onClick={handleSignOut}>
                            <LogOut size={16} /> {t("exit")}
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
};