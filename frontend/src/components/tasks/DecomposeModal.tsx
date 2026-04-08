import type {DecomposeStep} from "@/types/task.ts";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

function DecomposeModal({isOpen, steps, onAccept, onRegenerate, onCancel, decomposedTaskId}: DecomposeModalProps){
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl text-foreground!">Decomposed task</DialogTitle>
                    <DialogDescription>Review your subtasks before accepting.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-2">
                    {steps.map((step) => (
                        <div key={step.step} className="flex items-start gap-3 bg-muted rounded-lg p-3">
                            <span className="text-sky-500 font-bold text-sm min-w-[20px]">{step.step}.</span>
                            <div className="flex-1">
                                <p className="text-sm text-foreground">{step.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">⏱ {step.duration_minutes} min</p>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onCancel}>Close</Button>
                    <Button className="bg-amber-400 hover:bg-amber-500 text-black" onClick={onRegenerate}>{
                        decomposedTaskId ? <span className='flex gap-2'><Spinner /> Regenerating... </span> : <>Regenerate</>
                    }</Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={onAccept}>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default DecomposeModal