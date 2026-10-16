import { z } from 'zod';

export const serviceNames = ['Mudanças residenciais', 'Mudanças de apartamentos', 'Mudanças de escritórios', 'Transporte de móveis'] as const;
export const elevatorOptions = ['Sim', 'Não', 'Não sei'] as const;

const numberInput = (schema: z.ZodNumber, optional = false) => z.preprocess(
  value => typeof value === 'string' ? (value.trim() === '' ? undefined : Number(value.replace(',', '.'))) : value,
  optional ? schema.optional() : schema,
);

export const pricingInputSchema = z.object({
  service: z.enum(serviceNames, { errorMap: () => ({ message: 'Selecione o tipo de serviço.' }) }),
  distanceKm: numberInput(z.number({ invalid_type_error: 'Indique uma distância válida.' }).finite().min(0, 'A distância não pode ser negativa.').max(10000, 'Utilize até 10 000 km.'), true),
  rooms: numberInput(z.number({ required_error: 'Indique o número de divisões.', invalid_type_error: 'Indique um número válido.' }).finite().int('Indique um número inteiro.').min(1, 'Indique pelo menos uma divisão.').max(50, 'Utilize até 50 divisões.')),
  originFloor: numberInput(z.number({ required_error: 'Indique o piso de origem.' }).finite().int('Indique um piso inteiro.').min(-5, 'Utilize um piso entre -5 e 100.').max(100, 'Utilize um piso entre -5 e 100.')),
  destinationFloor: numberInput(z.number({ required_error: 'Indique o piso de destino.' }).finite().int('Indique um piso inteiro.').min(-5, 'Utilize um piso entre -5 e 100.').max(100, 'Utilize um piso entre -5 e 100.')),
  originElevator: z.enum(elevatorOptions, { errorMap: () => ({ message: 'Indique se existe elevador na origem.' }) }),
  destinationElevator: z.enum(elevatorOptions, { errorMap: () => ({ message: 'Indique se existe elevador no destino.' }) }),
});

const tariff = z.number().finite().nonnegative().max(1_000_000).nullable();
export const pricingConfigSchema = z.object({
  baseByService: z.object({
    'Mudanças residenciais': tariff,
    'Mudanças de apartamentos': tariff,
    'Mudanças de escritórios': tariff,
    'Transporte de móveis': tariff,
  }),
  perKm: tariff,
  perRoom: tariff,
  perFloorWithoutElevator: tariff,
  minimum: tariff,
});
export type PricingConfig = z.infer<typeof pricingConfigSchema>;

// Valores em euros: substituir null apenas depois de confirmação pelo proprietário.
// Zero significa explicitamente «sem suplemento»; null significa «por configurar».
// Confirmar também a fórmula: base + km × tarifa + divisões × tarifa + pisos × tarifa,
// com aplicação do preço mínimo. Cada piso acima/abaixo do rés-do-chão conta
// apenas quando não existe elevador. Não assumir descontos ou suplementos adicionais.
export const pricingConfig: PricingConfig = {
  baseByService: {
    'Mudanças residenciais': null,
    'Mudanças de apartamentos': null,
    'Mudanças de escritórios': null,
    'Transporte de móveis': null,
  },
  perKm: null,
  perRoom: null,
  perFloorWithoutElevator: null,
  minimum: null,
};

export const pricingUnavailableMessage = 'O cálculo automático será ativado assim que confirmarmos os valores do serviço. Pode enviar já o pedido para receber um orçamento personalizado.';
export const confirmationNotice = 'Preço sujeito a confirmação pela empresa. Data sujeita a confirmação pela equipa.';
export type EstimateResult = { status: 'estimated'; total: number } | { status: 'unavailable' | 'invalid'; message: string };

export function calculateEstimate(input: unknown, config: unknown = pricingConfig): EstimateResult {
  const parsedInput = pricingInputSchema.safeParse(input);
  const parsedConfig = pricingConfigSchema.safeParse(config);
  if (!parsedInput.success || !parsedConfig.success) return { status: 'invalid', message: 'Verifique os dados da mudança. O preço será confirmado pela empresa.' };
  const data = parsedInput.data;
  const rates = parsedConfig.data;
  const base = rates.baseByService[data.service];
  if (base === null || rates.perKm === null || rates.perRoom === null || rates.perFloorWithoutElevator === null || rates.minimum === null || data.distanceKm === undefined) {
    return { status: 'unavailable', message: pricingUnavailableMessage };
  }
  if (rates.perFloorWithoutElevator > 0 && ((data.originFloor !== 0 && data.originElevator === 'Não sei') || (data.destinationFloor !== 0 && data.destinationElevator === 'Não sei'))) {
    return { status: 'unavailable', message: 'Precisamos de confirmar os elevadores para calcular a estimativa. Pode enviar já o pedido para receber um orçamento personalizado.' };
  }
  const floors = (data.originElevator === 'Não' ? Math.abs(data.originFloor) : 0) + (data.destinationElevator === 'Não' ? Math.abs(data.destinationFloor) : 0);
  const total = Math.max(rates.minimum, base + data.distanceKm * rates.perKm + data.rooms * rates.perRoom + floors * rates.perFloorWithoutElevator);
  if (!Number.isFinite(total) || total > Number.MAX_SAFE_INTEGER / 100) return { status: 'invalid', message: 'Não foi possível calcular uma estimativa válida. Peça um orçamento personalizado.' };
  return { status: 'estimated', total: Math.round(total * 100) / 100 };
}

export function formatEstimate(total: number) {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(total);
}