import { Button } from '@/components/ui/button'

interface NavbarProps {
    isDark: boolean
    onToggleTheme: () => void
    onLogout: () => void
}

function Navbar({isDark, onToggleTheme, onLogout}:NavbarProps){
    return(
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
            <h2 className="text-xl font-bold text-foreground m-0">FocusTasker</h2>
            <div className="flex gap-2">
                <Button variant='outline' onClick={onToggleTheme}>{isDark ? '☀️ Light' : '🌙 Dark'}</Button>
                <Button variant='destructive' onClick={onLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Navbar