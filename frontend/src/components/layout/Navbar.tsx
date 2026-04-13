interface NavbarProps {
    isDark: boolean
    onToggleTheme: () => void
    onLogout: () => void
    onOpenProfile: () => void
}

function Navbar({isDark, onToggleTheme, onLogout, onOpenProfile}: NavbarProps) {
    return (
        <nav
            className="flex items-center justify-between px-8 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">FocusTasker</span>
            <div className="flex gap-2 items-center">
                <button
                    onClick={onToggleTheme}
                    className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    {isDark ? 'Light' : 'Dark'}
                </button>
                <button
                    onClick={onOpenProfile}
                    className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    Profile
                </button>
                <button
                    onClick={onLogout}
                    className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
