"use client";

import { ChevronDownIcon, ChevronsLeft, LogOut, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes"
import { useState } from "react";

import { signOut } from "@/auth";
import {
    Button,
    Calendar,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
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
    const [openDates, setOpenDates] = useState(false);
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);

    const {
        account,
        setAccount,
        industry,
        setIndustry,
        state,
        setState,
        startDate,
        setStartDate,
        endDate,
        setEndDate
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
                            <SelectValue>{account === 'All' ? t('all-accounts') : account}</SelectValue>
                        </SelectTrigger>

                        <SelectContent className="bg-slate-100 dark:bg-slate-900 text-foreground border border-border">
                            <SelectItem value="All">{t('all-accounts')}</SelectItem>
                            {accounts.map((a) => (
                                <SelectItem key={a} value={a}>
                                    {a}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="bg-slate-100 dark:bg-slate-900 text-foreground min-w-[150px] relative">
                            <SelectValue>{industry === 'All' ? t('all-industries') : industry}</SelectValue>
                        </SelectTrigger>

                        <SelectContent className="bg-slate-100 dark:bg-slate-900 text-foreground border border-border">
                            <SelectItem value="All">{t('all-industries')}</SelectItem>
                            {industries.map((i) => (
                                <SelectItem key={i} value={i}>
                                    {i}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={state} onValueChange={setState}>
                        <SelectTrigger className="bg-slate-100 dark:bg-slate-900 text-foreground min-w-[150px] relative">
                            <SelectValue>{state === 'All' ? t('all-states') : state}</SelectValue>
                        </SelectTrigger>

                        <SelectContent className="bg-slate-100 dark:bg-slate-900 text-foreground border border-border">
                            <SelectItem value="All">{t('all-states')}</SelectItem>
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
                    className="bg-black dark:bg-blue-500 text-white"
                    onClick={() => {
                        setOpenDates((v) => !v)
                        setOpen(false)
                    }}
                >
                    {t('select-dates')}
                </Button>            

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
                    onClick={() => {
                        setOpen((v) => !v)
                        setOpenDates(false)
                    }}
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

                {openDates && (
                    <div className="absolute right-4 top-16 bg-slate-100 dark:bg-slate-900 border border-border rounded shadow-lg flex flex-col gap-4 p-4 z-50 min-w-[180px]">
                       <div className="flex flex-col gap-3">
                            <Label htmlFor="startDate" className="px-1">
                                {t('start-date')}
                            </Label>
                            <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-40 justify-between font-normal"
                                    >
                                        {startDate ? startDate.toLocaleDateString(): t('select-date')}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate!}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setStartDate(date!)
                                        setOpenStartDate(false)
                                    }}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label htmlFor="startDate" className="px-1">
                                {t('end-date')}
                            </Label>
                            <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-40 justify-between font-normal"
                                    >
                                        {endDate ? endDate.toLocaleDateString() : t('select-date')}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate!}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setEndDate(date!)
                                        setOpenEndDate(false)
                                    }}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};