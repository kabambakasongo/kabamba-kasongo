/** Fusionne des classes Tailwind en resolving les conflits de maniere fiable. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
