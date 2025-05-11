export function validateString(value: string | null | undefined, trimInput: boolean = true): string | null {
  if (value === null || value === undefined) return null;

  const processedValue = trimInput ? value.trim() : value;
  if (processedValue === "") return null;

  return processedValue; 
}