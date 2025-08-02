export function Footer() {
    return (
        <div className="w-full bg-white dark:bg-[#0F172B] dark:text-gray-400 py-10">
            <div className="flex flex-row items-center justify-center space-y-2 text-center gap-8">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">
                    TKS
                </h1>

                <div className="text-sm">
                    © {new Date().getFullYear()} Thiago Suzuki
                </div>
            </div>
        </div>
    )
}