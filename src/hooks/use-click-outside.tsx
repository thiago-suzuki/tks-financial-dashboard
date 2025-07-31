"use client";

import { useEffect } from "react";

interface UseClickOutsideProps {
    refs: React.RefObject<HTMLElement>[];
    callback: (event: MouseEvent) => void;
}

export const useClickOutside = ({ refs, callback }: UseClickOutsideProps) => {
    useEffect(() => {
        const handleOutsideClick = (event?: any) => {
            const isOutside = refs.every((ref) => !ref?.current?.contains(event.target));

            if (isOutside && typeof callback === "function") {
                callback(event);
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [callback, refs]);
};
