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
import {Input} from "@/components/ui/input.tsx";

interface DecomposeModalProps {
    isOpen: boolean
    steps: DecomposeStep[]
    onAccept: () => void
    onRegenerate: () => void
    onCancel: () => void
}

function DecomposeModal({isOpen, steps, onAccept, onRegenerate, onCancel}: DecomposeModalProps){
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Decomposed task</DialogTitle>
                    <DialogDescription>Say hello to your subtasks!</DialogDescription>
                </DialogHeader>
                <div className='mx-4'>
                    <ol>
                        {steps.map((step, index) => (
                            <li key={index} className='flex gap-2'>
                                <span>{index} {step.title}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </DialogContent>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                    <Button variant="outline">Regenerate</Button>
                    <Button variant="outline">Accept</Button>
                </DialogClose>
            </DialogFooter>
        </Dialog>
    )
}

export default DecomposeModal