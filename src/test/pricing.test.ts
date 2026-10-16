import { describe, expect, it } from 'vitest';
import { calculateEstimate, pricingConfig, pricingUnavailableMessage } from '@/lib/pricing';
const input = { service: 'Mudanças residenciais', distanceKm: 20, rooms: 3, originFloor: 2, destinationFloor: 1, originElevator: 'Não', destinationElevator: 'Sim' };
// Valores apenas de teste: não representam tarifas da empresa.
const testRates = { baseByService: { 'Mudanças residenciais': 10, 'Mudanças de apartamentos': 10, 'Mudanças de escritórios': 10, 'Transporte de móveis': 10 }, perKm: 1, perRoom: 2, perFloorWithoutElevator: 3, minimum: 0 };
describe('calculateEstimate', () => {
  it('keeps calculation disabled while rates are not configured', () => {
    expect(calculateEstimate(input, pricingConfig)).toEqual({ status: 'unavailable', message: pricingUnavailableMessage });
  });
  it('calculates only with complete test configuration and applies the minimum', () => {
    expect(calculateEstimate(input, testRates)).toEqual({ status: 'estimated', total: 42 });
    expect(calculateEstimate(input, { ...testRates, minimum: 100 })).toEqual({ status: 'estimated', total: 100 });
  });
  it('does not return a partial total', () => {
    expect(calculateEstimate({ ...input, distanceKm: undefined }, testRates).status).toBe('unavailable');
    expect(calculateEstimate(input, { ...testRates, perRoom: null }).status).toBe('unavailable');
    expect(calculateEstimate({ ...input, originElevator: 'Não sei' }, testRates).status).toBe('unavailable');
  });
  it('rejects invalid inputs and rates', () => {
    for (const bad of [{ distanceKm: -1 }, { distanceKm: Infinity }, { rooms: 0 }, { rooms: 1.5 }, { originFloor: NaN }, { service: 'Armazenamento' }]) expect(calculateEstimate({ ...input, ...bad }, testRates).status).toBe('invalid');
    expect(calculateEstimate(input, { ...testRates, perKm: -1 }).status).toBe('invalid');
    expect(calculateEstimate(input, { ...testRates, perKm: Infinity }).status).toBe('invalid');
  });
});
