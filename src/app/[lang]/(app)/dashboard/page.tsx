import { Metadata } from "next";
import { Dashboard } from "@/components/Pages";

export const metadata: Metadata = {
  title: 'Dashboard | TKS Financial'
}

export default function DashboardPage() {    
    return <Dashboard />
}