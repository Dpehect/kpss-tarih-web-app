import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class merge helper.
 * shadcn/ui componentleri eklendiğinde aynı helper kullanılacak.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
