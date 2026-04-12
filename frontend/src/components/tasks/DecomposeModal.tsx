import type {DecomposeStep} from "@/types/task.ts";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {Spinner} from "@/components/ui/spinner.tsx";

interface DecomposeModalProps {
    isOpen: boolean
    steps: DecomposeStep[]
    onAccept: () => void
    onRegenerate: () => void
    onCancel: () => void
    decomposedTaskId: number | null
}

function DecomposeModal({isOpen, steps, onAccept, onRegenerate, onCancel, decomposedTaskId}: DecomposeModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-lg text-slate-800 dark:text-slate-100">Decomposed task</DialogTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Review your subtasks before accepting.</p>
                </DialogHeader>

                <div className="flex flex-col gap-2 py-2">
                    {steps.map((step) => (
                        <div key={step.step} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 rounded-xl p-3">
                            <span className="text-emerald-500 font-semibold text-sm min-w-[20px]">{step.step}.</span>
                            <div className="flex-1">
                                <p className="text-sm text-slate-700 dark:text-slate-200">{step.title}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">⏱ {step.duration_minutes} min</p>
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        onClick={onCancel}
                    >
                        Close
                    </Button>
                    <Button
                        className="rounded-xl bg-amber-400 hover:bg-amber-500 text-black"
                        onClick={onRegenerate}
                    >
                        {decomposedTaskId
                            ? <span className='flex items-center gap-2'><Spinner /> Regenerating...</span>
                            : 'Regenerate'
                        }
                    </Button>
                    <Button
                        className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={onAccept}
                    >
                        Accept
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DecomposeModal
