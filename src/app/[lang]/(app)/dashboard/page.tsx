"use client";

import { BanknoteArrowDown, DollarSign, HandCoins } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

import { useFilter } from "@/contexts";
import { getTransactionSummary, TransactionSummary } from "@/services/getTransactionSummary";


export default function DashboardPage() {
    const t = useTranslations('Pages.Dashboard');

    const { 
        account,
        industry,
        state,
        startDate,
        endDate
    } = useFilter()

    const [summary, setSummary] = useState<TransactionSummary>();

    useEffect(() => {
        if (startDate && endDate) {
            const data = getTransactionSummary({
                account,
                industry,
                state,
                startDate: Date.parse(startDate.toISOString()),
                endDate: Date.parse(endDate.toISOString())
            })
            setSummary(data);
        }
    }, [account, industry, state, startDate, endDate]);

    if(!summary) {
        return <h1 className="font-bold text-4xl">{t('select-date')}</h1>;
    }

    return (     
        <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <HandCoins size={26} />
                        </div>
                        <p className="card-title">{t('Cards.receipes')}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {summary.depositCount}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <BanknoteArrowDown size={26} />
                        </div>
                        <p className="card-title">{t('Cards.withdraws')}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {summary.withdrawCount}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <BanknoteArrowDown size={26} />
                        </div>
                        <p className="card-title">{t('Cards.transactions')}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {summary.transactionCount}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">{t('Cards.total')}</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">+
                            {summary.totalBalance}
                        </p>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">{t('Chart.title-bar-chart-one')}</p>
                    </div>
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <div style={{ width: `${summary.amountByState.length * 100}px`, minWidth: '600px' }}>
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <BarChart
                                    data={summary.amountByState}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="state" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="deposit" name={t('Chart.receipe')} fill="#2e21e3" activeBar={<Rectangle fill="blue" stroke="blue" />} />
                                    <Bar dataKey="withdraw" name={t('Chart.withdraws')} fill="#0585db" activeBar={<Rectangle fill="blie" stroke="blue" />} />
                                </BarChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}