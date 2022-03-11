import { convertKelvinToCelcius } from '../util';

describe('Converting degrees Kelvin to degrees celcius', () => {
  it('returns the expected value', () => {
    const result = convertKelvinToCelcius(273);
    expect(result).toBe(0);
  });

  it('can return a negative value', () => {
    const result = convertKelvinToCelcius(271);
    expect(result).toBe(-2);
  });

  it('can round up non-integer results', () => {
    const result = convertKelvinToCelcius(273.5);
    expect(result).toBe(1);
  });

  it('can round down non-integer results', () => {
    const result = convertKelvinToCelcius(273.4);
    expect(result).toBe(0);
  });
});
