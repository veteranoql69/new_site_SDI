// Validaciones compartidas entre el formulario del chat y las rutas /api/chat.

export const MAX_MESSAGE_LENGTH = 2000;

/**
 * Normaliza un teléfono a E.164. Los números chilenos se aceptan como
 * "9 1234 5678", "56912345678" o "+56 9 1234 5678". El teléfono es la llave que
 * une a la persona si después escribe por WhatsApp, así que no puede quedar en
 * formatos distintos para el mismo número.
 */
export function normalizePhone(input: string): string | null {
  const hasPlus = input.trim().startsWith("+");
  const digits = input.replace(/\D/g, "");

  if (!hasPlus && digits.length === 9 && digits.startsWith("9")) return `+56${digits}`;
  if (!hasPlus && digits.length === 11 && digits.startsWith("569")) return `+${digits}`;
  if (hasPlus && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return null;
}

export function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

export function cleanName(input: string): string | null {
  const name = input.trim().replace(/\s+/g, " ");
  return name.length >= 2 && name.length <= 80 ? name : null;
}
