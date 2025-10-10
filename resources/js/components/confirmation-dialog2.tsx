import * as React from "react"

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
import { ScrollArea } from "@/components/ui/scroll-area"

interface ConfirmationDialogProps {
	children: React.ReactNode
	title: React.ReactNode
	closeButton: React.ReactNode
	confirmButton: React.ReactNode
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function ConfirmationDialog2({
	children,
	title,
	closeButton,
	confirmButton,
	open,
	onOpenChange,
}: ConfirmationDialogProps) {
	// store scroll position so we can restore it
	const yRef = React.useRef(0)

	React.useEffect(() => {
		const body = document.body

		if (open) {
			// remember where we were
			yRef.current = window.scrollY

			// lock the page by fixing the body (simple + reliable)
			body.style.setProperty("position", "fixed", "important")
			body.style.setProperty("top", `-${yRef.current}px`, "important")
			body.style.setProperty("left", "0", "important")
			body.style.setProperty("right", "0", "important")
			body.style.setProperty("width", "100%", "important")
		} else {
			// unlock and restore scroll
			body.style.removeProperty("position")
			body.style.removeProperty("top")
			body.style.removeProperty("left")
			body.style.removeProperty("right")
			body.style.removeProperty("width")
			window.scrollTo(0, yRef.current)
		}

		// cleanup in case the component unmounts while open
		return () => {
			body.style.removeProperty("position")
			body.style.removeProperty("top")
			body.style.removeProperty("left")
			body.style.removeProperty("right")
			body.style.removeProperty("width")
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-3xl">
				<DialogHeader className="contents space-y-0">
					<ScrollArea className="flex max-h-full flex-col overflow-hidden">
						<DialogTitle className="px-6 pt-6">
							{ title }
						</DialogTitle>
						<DialogDescription asChild>
							<div className="p-6">
								<div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
									{children}
								</div>
							</div>
						</DialogDescription>
					</ScrollArea>
				</DialogHeader>
				<DialogFooter className="flex-row items-center justify-end border-t px-6 py-4">
					<DialogClose asChild>
						{closeButton}
					</DialogClose>

					{confirmButton}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
