import { withOpacity } from '../../shared/opacity';

describe('withOpacity', () => {
  describe('casos básicos con colores de 6 dígitos', () => {
    it('agrega opacidad correctamente a colores HEX estándar', () => {
      expect(withOpacity('#ffffff', 1)).toBe('#ffffffff');
      expect(withOpacity('#000000', 1)).toBe('#000000ff');
      expect(withOpacity('#ff00ff', 0.5)).toBe('#ff00ff80');
      expect(withOpacity('#123456', 0.25)).toBe('#12345640');
    });

    it('maneja opacidad 0 y 1 en los límites', () => {
      expect(withOpacity('#abcdef', 0)).toBe('#abcdef00');
      expect(withOpacity('#abcdef', 1)).toBe('#abcdefff');
    });
  });

  describe('redondeo preciso del canal alfa', () => {
    it('redondea correctamente valores decimales', () => {
      expect(withOpacity('#000000', 0.5)).toBe('#00000080'); // 127.5 → 128
      expect(withOpacity('#000000', 0.1)).toBe('#0000001a'); // 25.5 → 26
      expect(withOpacity('#000000', 0.01)).toBe('#00000003'); // 2.55 → 3
      expect(withOpacity('#000000', 0.99)).toBe('#000000fc'); // 252.45 → 252
    });
  });

  describe('soporte para mayúsculas/minúsculas y formato corto (#FFF)', () => {
    it('mantiene mayúsculas y minúsculas del color original', () => {
      expect(withOpacity('#ABCDEF', 0.3)).toBe('#ABCDEF4d');
      expect(withOpacity('#abcdef', 0.3)).toBe('#abcdef4d');
    });

    it('soporta formato corto de 3 dígitos (#FFF) preservando casing', () => {
      expect(withOpacity('#fff', 1)).toBe('#ffffffff');
      expect(withOpacity('#FFF', 1)).toBe('#FFFFFFff');
      expect(withOpacity('#F0F', 0.2)).toBe('#FF00FF33');
    });
  });

  describe('seguridad: clamping y valores fuera de rango', () => {
    it('clampea opacidad negativa a 0', () => {
      expect(withOpacity('#ffffff', -0.5)).toBe('#ffffff00');
      expect(withOpacity('#ffffff', -10)).toBe('#ffffff00');
    });

    it('clampea opacidad mayor a 1', () => {
      expect(withOpacity('#ffffff', 1.5)).toBe('#ffffffff');
      expect(withOpacity('#ffffff', 10)).toBe('#ffffffff');
    });

    it('maneja NaN como opacidad 0', () => {
      // @ts-ignore - probamos caso extremo
      expect(withOpacity('#ffffff', NaN)).toBe('#ffffff00');
    });
  });

  describe('validación de entrada inválida', () => {
    it('usa fallback #000000 para colores inválidos y avisa en consola', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      expect(withOpacity('#ggg', 0.5)).toBe('#00000080');
      expect(withOpacity('invalid', 1)).toBe('#000000ff');
      expect(withOpacity('#12345', 0.8)).toBe('#000000cc');
      expect(withOpacity('', 0.3)).toBe('#0000004d');

      expect(consoleWarnSpy).toHaveBeenCalledTimes(4);
      consoleWarnSpy.mockRestore();
    });

    it('acepta colores sin el símbolo #', () => {
      expect(withOpacity('ffffff', 0.5)).toBe('#ffffff80');
      expect(withOpacity('000000', 1)).toBe('#000000ff');
    });
  });
});
