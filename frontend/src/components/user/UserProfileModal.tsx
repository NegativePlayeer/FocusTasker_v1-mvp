import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx"
import {useState} from "react"

interface UserProfileModalProps {
    isOpen: boolean
    onClose: () => void
    currentPreferences: string
    currentStruggles: string
    onSave: (preferences: string, struggles: string) => void
}

const STRUGGLES_TAGS = [
    'Procrastination', 'Distraction', 'Task initiation',
    'Time blindness', 'Forgetfulness', 'Decision paralysis',
    'Hyperfocus', 'Overwhelm'
]

const PREFERENCES_TAGS = [
    'Short sessions (25 min)', 'Frequent breaks', 'Step-by-step instructions',
    'Visual progress', 'Background music', 'Morning focus',
    'Evening focus', 'Pomodoro technique'
]

function UserProfileModal({isOpen, onClose, currentPreferences, currentStruggles, onSave}: UserProfileModalProps) {
    const [selectedStruggles, setSelectedStruggles] = useState<string[]>(
        currentStruggles ? currentStruggles.split(', ') : []
    )
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
        currentPreferences ? currentPreferences.split(', ') : []
    )

    const handleSave = () => {
        onSave(selectedPreferences.join(', '), selectedStruggles.join(', '))
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-lg text-slate-800 dark:text-slate-100">Your focus profile</DialogTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your ADHD profile anytime.</p>
                </DialogHeader>

                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">My struggles</p>
                        <div className="flex flex-wrap gap-2">
                            {STRUGGLES_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedStruggles(prev =>
                                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                    )}
                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                                        selectedStruggles.includes(tag)
                                            ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-700'
                                            : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">My preferences</p>
                        <div className="flex flex-wrap gap-2">
                            {PREFERENCES_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedPreferences(prev =>
                                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                    )}
                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                                        selectedPreferences.includes(tag)
                                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700'
                                            : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserProfileModal
