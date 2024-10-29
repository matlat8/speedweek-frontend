"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function useDialogContent(open: boolean) {
	const [ render, setRender ] = useState(false);
	useEffect(function() {
		if (open) setRender(true);
		else setTimeout(() => setRender(false), 150);
	}, [ open ]);
	return render;
}

interface Props {

	/**
	 * If true, the modal will render as a traditional block element.
	 * @default false
	 */
	inline?: boolean;

	/**
	 * The current state of the modal
	 */
	state: [ boolean, (open: boolean) => void ];

	/**
	 * Close on click away
	 * @default true
	 */
	closeOnBlur?: boolean;

	/**
	 * Close on escape key
	 * @default true
	 */
	bindEscKey?: boolean;

	/**
	 * If the children should always be mounted in the modal or only when the modal is open
	 * @default false
	 */
	renderContents?: boolean;

}

export function Modal({ children, renderContents = false, closeOnBlur = true, bindEscKey = true, state: [ state, setState ], className, ...props }: Props & HTMLAttributes<HTMLDialogElement>) {

	// Get a reference to the dialog element
	const ref = useRef<HTMLDialogElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	// Hook into open prop
	const [ isOpen, setIsOpen ] = useState(state === true);
	useEffect(() => setIsOpen(state === true), [ state ]);
	
	// Open dialog using the new dialog element in accordance with the state
	useEffect(function() {
		if (!ref.current) return;
		if (state) ref.current.showModal();
		else setTimeout(() => ref.current?.close(), 150);
	}, [ ref, state ]);
	
	// Close on blur
	useEffect(function() {
		const element = ref.current;
		if (!element) return;

		function onClick(event: MouseEvent) {
			if (!element || !element.open || !contentRef.current) return;

			// Get dialog bounds
			const { top, left, width, height } = contentRef.current.getBoundingClientRect();

			// If click is inside of dialog
			if (event.clientX >= left && event.clientX <= left + width && event.clientY >= top && event.clientY <= top + height) return;

			// If close on blur is disabled, just bounce the dialog
			if (!closeOnBlur) return;

			// Close dialog
			setState(false);

		}

		element.addEventListener("click", onClick);
		return () => element.removeEventListener("click", onClick);
		
	}, [ ref, closeOnBlur, isOpen, state, setState ]);
	
	// On escape key, gracefully close the dialog
	useEffect(function() {
		
		function onKeydown(event: KeyboardEvent) {

			// If the key is not escape, return
			if (event.key !== "Escape") return;

			// If the dialog is not open, return
			if (!ref.current || !ref.current.open) return;

			// Close the dialog
			event.preventDefault();
			if (bindEscKey) setState(false);

		}

		window.addEventListener("keydown", onKeydown);
		return () => window.removeEventListener("keydown", onKeydown);

	}, [ ref, isOpen, state, setState, bindEscKey ]);
	
	const contentVisable = useDialogContent(isOpen);

	return (
		<dialog
			className={ cn([
				"p-0 bg-transparent h-full overflow-visible focus:outline-0 transition-opacity transform-gpu backdrop:transform-gpu backdrop:transition-[backdrop-filter,background-color] w-full justify-center flex",
				isOpen ? "backdrop:bg-gray-900/50" : "opacity-0 backdrop:bg-transparent pointer-events-none",
				"flex items-center"
			]) }
			ref={ ref }
			{ ...props }>
			<div
				className={ cn("transition-transform transform-gpu overflow-visible flex items-center justify-center", isOpen ? "scale-100" : "scale-90", className) }
				ref={ contentRef }>
				{ (contentVisable || renderContents) && children }
			</div>
		</dialog>
	);
}