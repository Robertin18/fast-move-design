import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, CalendarIcon, Check, Copy, MessageCircle, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { quoteSchema, quoteMessage, serviceNames, whatsappUrl } from '@/lib/company';
import { calculateEstimate, confirmationNotice, elevatorOptions, formatEstimate, pricingUnavailableMessage, type EstimateResult } from '@/lib/pricing';

export function QuoteForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [date, setDate] = useState<Date>();
  const [dateOpen, setDateOpen] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult>();
  const resultRef = useRef<HTMLDivElement>(null);
  const wa = message ? whatsappUrl(message) : null;
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const result = quoteSchema.safeParse(raw);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { next[String(issue.path[0])] ??= issue.message; });
      setErrors(next); setMessage('');
      const first = result.error.issues[0]?.path[0];
      if (first === 'date') event.currentTarget.querySelector<HTMLElement>('#quote-date')?.focus();
      else if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${String(first)}"]`)?.focus();
      return;
    }
    setErrors({}); setCopied(false); setCopyError(false);
    setEstimate(calculateEstimate(result.data));
    setMessage(quoteMessage(result.data));
    requestAnimationFrame(() => resultRef.current?.focus());
  };
  const field = (name: string, label: string, placeholder: string, type = 'text', maxLength = 200, optional = false, hint?: string, min?: number, max?: number) => <div className="field"><label htmlFor={`quote-${name}`}>{label} <span>{optional ? '(opcional)' : '*'}</span></label><input id={`quote-${name}`} name={name} type={type} placeholder={placeholder} maxLength={maxLength} required={!optional} min={min} max={max} step={name === 'distanceKm' ? 'any' : type === 'number' ? 1 : undefined} inputMode={name === 'distanceKm' ? 'decimal' : type === 'number' ? 'numeric' : undefined} aria-invalid={Boolean(errors[name])} aria-describedby={[hint ? `hint-${name}` : '', errors[name] ? `error-${name}` : ''].filter(Boolean).join(' ') || undefined} autoComplete={name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'off'} />{hint && <span id={`hint-${name}`} className="field-hint">{hint}</span>}{errors[name] && <span id={`error-${name}`} className="field-error">{errors[name]}</span>}</div>;
  const elevator = (name: string, label: string) => <div className="field"><label htmlFor={`quote-${name}`}>{label} <span>*</span></label><select id={`quote-${name}`} name={name} defaultValue="Não sei" required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined}>{elevatorOptions.map(option => <option key={option}>{option}</option>)}</select>{errors[name] && <span id={`error-${name}`} className="field-error">{errors[name]}</span>}</div>;
  const invalidate = () => { setMessage(''); setEstimate(undefined); setCopied(false); setCopyError(false); setErrors({}); };
  return <section className="section-space" id="orcamento"><div className="container-shell quote-grid">
    <div className="quote-intro"><p className="eyebrow">O próximo passo começa aqui</p><h2>VAMOS PLANEAR<br />A SUA MUDANÇA?</h2><p>Conte-nos o que precisa. Vamos encontrar a solução mais adequada à sua próxima etapa.</p><div className="quote-detail"><MessageCircle /><div><strong>Uma conversa, uma solução.</strong><span>Atendimento atento às suas necessidades.</span></div></div><div className="quote-detail"><ShieldCheck /><div><strong>Os seus dados, com cuidado.</strong><span>Utilizados apenas para o seu pedido.</span></div></div></div>
    <form className="quote-form" onSubmit={submit} onChange={invalidate} noValidate>
      <p className="quote-group-heading">O seu contacto</p>
      {field('name', 'Nome', 'O seu nome', 'text', 100)}
      {field('phone', 'Número de telefone', 'O seu contacto', 'tel', 25)}
      <p className="quote-group-heading">A sua mudança</p>
      {field('origin', 'Local de origem', 'De onde vai mudar?')}
      {field('destination', 'Local de destino', 'Para onde vai mudar?')}
      <div className="field"><label htmlFor="quote-service">Tipo de serviço <span>*</span></label><select id="quote-service" name="service" defaultValue="" required aria-invalid={Boolean(errors['service'])} aria-describedby={errors['service'] ? 'error-service' : undefined}><option value="" disabled>Selecione o serviço</option>{serviceNames.map(s => <option key={s}>{s}</option>)}</select>{errors['service'] && <span id="error-service" className="field-error">{errors['service']}</span>}</div>
      <div className="field"><label htmlFor="quote-date">Data pretendida <span>*</span></label><input type="hidden" name="date" value={date ? format(date, 'yyyy-MM-dd') : ''} /><Popover open={dateOpen} onOpenChange={setDateOpen}><PopoverTrigger asChild><Button id="quote-date" type="button" variant="outline" className="quote-date-button" aria-invalid={Boolean(errors['date'])} aria-describedby={`hint-date${errors['date'] ? ' error-date' : ''}`}><CalendarIcon />{date ? format(date, 'dd/MM/yyyy') : 'Selecione a data'}</Button></PopoverTrigger><PopoverContent className="w-auto max-w-[calc(100vw-24px)] p-0 pointer-events-auto" align="start"><Calendar mode="single" selected={date} onSelect={value => { setDate(value); setDateOpen(false); invalidate(); }} locale={pt} className="pointer-events-auto" /></PopoverContent></Popover><span id="hint-date" className="field-hint">Data sujeita a confirmação pela equipa</span>{errors['date'] && <span id="error-date" className="field-error">{errors['date']}</span>}</div>
      {field('distanceKm', 'Distância aproximada (km)', 'Se souber', 'number', 8, true, 'Estimativa do cliente, não verificada pela empresa.', 0, 10000)}
      {field('rooms', 'Dimensão (divisões/quartos)', 'Número aproximado', 'number', 2, false, 'Conte apenas as divisões com bens a transportar.', 1, 50)}
      <p className="quote-group-heading">Acessos aos locais</p>
      {field('originFloor', 'Piso de origem', '0 para rés-do-chão', 'number', 4, false, 'Rés-do-chão: 0. Cave: número negativo.', -5, 100)}
      {elevator('originElevator', 'Elevador na origem')}
      {field('destinationFloor', 'Piso de destino', '0 para rés-do-chão', 'number', 4, false, undefined, -5, 100)}
      {elevator('destinationElevator', 'Elevador no destino')}
      <div className="field full-field"><label htmlFor="quote-description">Descrição adicional <span>(opcional)</span></label><textarea id="quote-description" name="description" placeholder="Conte-nos mais sobre os bens, os acessos ou outras necessidades." maxLength={1500} aria-invalid={Boolean(errors['description'])} aria-describedby={errors['description'] ? 'error-description' : undefined} />{errors['description'] && <span id="error-description" className="field-error">{errors['description']}</span>}</div>
      <div className="quote-price-note"><strong>Orçamento personalizado</strong><p>{pricingUnavailableMessage}</p></div>
      <div className="form-bottom"><p>Os dados destinam-se apenas ao seu pedido de orçamento. Consulte a <Link to="/privacidade">política de privacidade</Link>.</p><Button type="submit" variant="brand">Preparar pedido de orçamento <ArrowUpRight /></Button></div>
      {message && <div className="quote-result" role="status" tabIndex={-1} ref={resultRef}><h3>O seu pedido está preparado.</h3><p>{wa ? 'Reveja os dados e abra o WhatsApp. A mensagem só será enviada quando confirmar o envio na conversa.' : 'Não foi enviada nenhuma mensagem. O WhatsApp não está configurado; pode copiar o seu pedido.'}</p>{estimate?.status === 'estimated' ? <p className="estimate-total"><strong>Estimativa indicativa: {formatEstimate(estimate.total)}</strong><br />Sujeita a confirmação da empresa; não é um orçamento final.</p> : <p>{estimate?.message}</p>}<p>{confirmationNotice}</p><textarea aria-label="Mensagem de orçamento preparada" readOnly value={message} /><div className="quote-result-actions">{wa && <Button variant="brand" asChild><a href={wa} target="_blank" rel="noopener noreferrer">Abrir WhatsApp <ArrowUpRight /></a></Button>}<Button variant="outline" type="button" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }}>{copied ? <Check /> : <Copy />}{copied ? 'Pedido copiado' : 'Copiar pedido'}</Button></div>{copyError && <p className="field-error">Selecione a mensagem acima e copie-a manualmente.</p>}</div>}
    </form>
  </div></section>;
}
