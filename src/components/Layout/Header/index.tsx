"use client";

import { ChevronsLeft, LogOut, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes"
import { useState } from "react";

import { signOut } from "@/auth";
import {
    Button,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui";
import profileImg from "@/assets/profile-image.jpg";
import { SelectLanguage } from "@/components";
import { useFilter } from "@/contexts";
import { accounts, industries, states } from "@/services/getTransactionFilters";

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export function Header({ collapsed, setCollapsed }: HeaderProps) {
    const t = useTranslations("Components.Header");

    const { theme, setTheme } = useTheme();

    const [open, setOpen] = useState(false);

    const {
        account,
        setAccount,
        industry,
        setIndustry,
        state,
        setState
    } = useFilter()

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
                <div className="hidden lg:flex lg:items-center lg:gap-2">
                    <Select value={account} onValueChange={setAccount}>
                        <SelectTrigger className="bg-slate-100 dark:bg-slate-900 text-foreground min-w-[150px] relative">
                            <SelectValue>{account === 'All' ? 'Todos' : account}</SelectValue>
                        </SelectTrigger>

                        <SelectContent className="bg-slate-100 dark:bg-slate-900 text-foreground border border-border">
                            <SelectItem value="All">Todos</SelectItem>
                            {accounts.map((a) => (
                                <SelectItem key={a} value={a}>
                                    {a}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="bg-slate-100 dark:bg-slate-900 text-foreground min-w-[150px] relative">
                            <SelectValue>{industry === 'All' ? 'Todos' : industry}</SelectValue>
                        </SelectTrigger>

                        <SelectContent className="bg-slate-100 dark:bg-slate-900 text-foreground border border-border">
                            <SelectItem value="All">Todos</SelectItem>
                            {industries.map((i) => (
                                <SelectItem key={i} value={i}>
                                    {i}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={state} onValueChange={setState}>
                        <SelectTrigger className="bg-slate-100 dark:bg-slate-900 text-foreground min-w-[150px] relative">
                            <SelectValue>{state === 'All' ? 'Todos' : state}</SelectValue>
                        </SelectTrigger>

                        <SelectContent className="bg-slate-100 dark:bg-slate-900 text-foreground border border-border">
                            <SelectItem value="All">Todos</SelectItem>
                            {states.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
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
                    <div className="absolute right-4 top-16 bg-slate-100 dark:bg-slate-900 border border-border rounded shadow-lg flex flex-col gap-4 p-4 z-50 min-w-[180px]">
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