export const validateStringLength = (input: string | null): string | null => 
  input?.trim() ? input : null;