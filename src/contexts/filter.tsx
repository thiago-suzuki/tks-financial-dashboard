"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextData {
    account: string;
    setAccount: (account: string) => void;
    industry: string;
    setIndustry: (industry: string) => void;
    state: string;
    setState: (state: string) => void;
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

function FilterProvider({ children }: { children: ReactNode }) {
    const [account, setAccount] = useState<string>('All')
    const [industry, setIndustry] = useState<string>('All')
    const [state, setState] = useState<string>('All')

    return (
        <FilterContext.Provider
            value={{
                account,
                setAccount,
                industry,
                setIndustry,
                state,
                setState
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

function useFilter(): FilterContextData {
    const context = useContext(FilterContext)

    if(!context) {
        throw new Error('useFilter must be used within a FilterProvider')
    }

    return context
}

export { FilterProvider, useFilter }