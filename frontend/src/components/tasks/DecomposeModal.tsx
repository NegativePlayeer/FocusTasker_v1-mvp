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
                    <DialogTitle className='text-foreground!'>Decomposed task</DialogTitle>
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
                        <Button className='cursor-pointer'  variant="outline" onClick={() => onCancel()}>Close</Button>
                    </DialogClose>
                    <Button className='cursor-pointer' variant="outline" onClick={() => onRegenerate()}>Regenerate</Button>
                    <Button className='cursor-pointer'  variant="outline" onClick={() => onAccept()}>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DecomposeModal