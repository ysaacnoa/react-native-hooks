// shared/opacity.ts

/**
 * Añade canal alfa a un color HEX preservando el casing original.
 * Soporta: #RGB, #RRGGBB, RGB, RRGGBB (con o sin #)
 * Formato corto expandido manteniendo casing exacto.
 * Validación estricta: fallback a #000000 si inválido.
 */
export const withOpacity = (hex: string, opacity: number): string => {
  // 1. Manejo seguro de opacidad
  let clampedOpacity = opacity;
  if (isNaN(opacity) || !isFinite(opacity)) {
    clampedOpacity = 0;
  } else {
    clampedOpacity = Math.max(0, Math.min(1, opacity));
  }

  const alpha = Math.round(clampedOpacity * 255);
  const alphaHex = alpha.toString(16).padStart(2, '0').toLowerCase();

  // 2. Limpieza del input
  const originalHex = hex.trim();
  let cleanHex = originalHex.replace(/^#/, '');

  let finalHexBase = '000000';

  // 3. Caso formato corto (3 caracteres)
  if (cleanHex.length === 3) {
    // Validamos que los 3 caracteres sean hex válidos
    if (/^[0-9A-Fa-f]{3}$/.test(cleanHex)) {
      // Solo expandimos si es válido
      finalHexBase = cleanHex
        .split('')
        .map((c) => c + c)
        .join('');
    } else {
      console.warn(
        `withOpacity: Color HEX inválido "${originalHex}". Usando #000000 como fallback.`
      );
    }
  }
  // 4. Caso formato largo (6 caracteres)
  else if (cleanHex.length === 6) {
    if (/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      finalHexBase = cleanHex; // preservamos casing original
    } else {
      console.warn(
        `withOpacity: Color HEX inválido "${originalHex}". Usando #000000 como fallback.`
      );
    }
  }
  // 5. Cualquier otra longitud o formato → inválido
  else {
    console.warn(
      `withOpacity: Color HEX inválido "${originalHex}". Usando #000000 como fallback.`
    );
  }

  return `#${finalHexBase}${alphaHex}`;
};
