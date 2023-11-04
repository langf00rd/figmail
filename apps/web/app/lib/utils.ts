import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * @param classNamesInput - `class names`
 * @returns `string - merged classes`
 */
export default function cn(...classNamesInput: ClassValue[]): string {
  return twMerge(clsx(classNamesInput));
}
