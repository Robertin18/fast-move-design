import { z } from 'zod';

// Populate only with details confirmed by the owner. Phone/WhatsApp: international digits, e.g. country code + number.
export const company = {
  name: 'FAST MUDANÇA',
  phone: '+351 926 951 040',
  whatsapp: '351926951040',
  email: '',
  location: 'Rua da Pandeirinha 38, 2845-244 Amora',
  serviceArea: '',
  social: [] as { label: string; url: string }[],
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.name}, ${company.location}`)}`;

export function whatsappUrl(message: string) {
  const number = company.whatsapp.replace(/[\s+()-]/g, '');
  if (!/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message.slice(0, 3500))}`;
}

export const serviceNames = ['Mudanças residenciais', 'Mudanças de apartamentos', 'Mudanças de escritórios', 'Transporte de móveis'] as const;
export const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Indique o seu nome.').max(100, 'Utilize até 100 caracteres.'),
  phone: z.string().trim().min(8, 'Indique um número de telefone válido.').max(25).regex(/^\+?[\d\s()-]+$/, 'Indique um número de telefone válido.').refine(v => v.replace(/\D/g, '').length >= 8 && v.replace(/\D/g, '').length <= 15, 'Indique um número de telefone válido.'),
  origin: z.string().trim().min(2, 'Indique o local de origem.').max(200),
  destination: z.string().trim().min(2, 'Indique o local de destino.').max(200),
  service: z.enum(serviceNames, { errorMap: () => ({ message: 'Selecione o tipo de serviço.' }) }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Indique uma data válida.').refine(value => {
    const date = new Date(`${value}T12:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return !Number.isNaN(date.getTime()) && date >= today && date.toISOString().slice(0, 10) === value;
  }, 'Escolha uma data a partir de hoje.'),
  description: z.string().trim().max(1500, 'Utilize até 1500 caracteres.'),
});
export type Quote = z.infer<typeof quoteSchema>;
export function quoteMessage(data: Quote) {
  const valid = quoteSchema.parse(data);
  return `Olá, FAST MUDANÇA! Gostaria de pedir um orçamento.\n\nNome: ${valid.name}\nTelefone: ${valid.phone}\nOrigem: ${valid.origin}\nDestino: ${valid.destination}\nServiço: ${valid.service}\nData pretendida: ${valid.date.split('-').reverse().join('/')}\n${valid.description ? `\nInformações adicionais: ${valid.description}\n` : ''}\nAguardo o vosso contacto. Obrigado!`;
}
