import type {DecomposeStep} from "@/types/task.ts";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DecomposeModalProps {
    isOpen: boolean
    steps: DecomposeStep[]
    onAccept: () => void
    onRegenerate: () => void
    onCancel: () => void
}

function DecomposeModal({isOpen, steps, onAccept, onRegenerate, onCancel}: DecomposeModalProps){
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Decomposed task</DialogTitle>
                    <DialogDescription>Say hello to your subtasks!</DialogDescription>
                </DialogHeader>
                <div className='mx-4'>
                    <ol>
                        {steps.map((step) => (
                            <li key={step.step} className='flex gap-2'>
                                <span>{step.step} {step.title}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => onCancel()}>Close</Button>
                    </DialogClose>
                    <Button variant="outline" onClick={() => onRegenerate()}>Regenerate</Button>
                    <Button variant="outline" onClick={() => onAccept()}>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DecomposeModal