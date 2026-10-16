import { describe, expect, it } from "vitest";
import { quoteSchema, quoteMessage, whatsappUrl } from "@/lib/company";
const valid = {
  name: "Ana Silva",
  phone: "+351 912 345 678",
  origin: "Lisboa",
  destination: "Setúbal",
  service: "Mudanças residenciais" as const,
  date: "2030-12-20",
  description: "Uma mesa e seis cadeiras.",
  distanceKm: "25",
  rooms: "3",
  originFloor: "2",
  destinationFloor: "0",
  originElevator: "Não" as const,
  destinationElevator: "Sim" as const,
};
describe("Quotation preparation", () => {
  it("validates and includes the supplied information in the message", () => {
    const data = quoteSchema.parse(valid);
    expect(quoteMessage(data)).toContain("Nome: Ana Silva");
    expect(quoteMessage(data)).toContain("Destino: Setúbal");
    expect(quoteMessage(data)).toContain("Data pretendida: 20/12/2030");
    expect(quoteMessage(data)).toContain("Distância aproximada (estimativa do cliente): 25 km");
    expect(quoteMessage(data)).toContain("Elevador na origem: Não");
    expect(quoteMessage(data)).toContain("Data sujeita a confirmação pela equipa");
    expect(quoteMessage(data)).not.toMatch(/€|null|NaN|Infinity/);
  });
  it("rejects incomplete, invalid and past-dated requests", () => {
    expect(
      quoteSchema.safeParse({ ...valid, name: "", phone: "invalid", date: "2020-01-01" }).success,
    ).toBe(false);
    expect(quoteSchema.safeParse({ ...valid, service: "Armazenamento" }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...valid, description: "a".repeat(1501) }).success).toBe(false);
  });
  it("opens WhatsApp with the confirmed contact number", () => {
    expect(whatsappUrl("Pedido de orçamento")).toBe(
      "https://wa.me/351926951040?text=Pedido%20de%20or%C3%A7amento",
    );
  });
});
