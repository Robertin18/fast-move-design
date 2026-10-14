import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Check, Copy, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quoteSchema, quoteMessage, serviceNames, whatsappUrl } from '@/lib/company';

export function QuoteForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [pending, setPending] = useState(false);
  const [dateMin] = useState('');
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
      if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${String(first)}"]`)?.focus();
      return;
    }
    setPending(true); setErrors({}); setCopied(false); setCopyError(false);
    setMessage(quoteMessage(result.data)); setPending(false);
  };
  const field = (name: string, label: string, placeholder: string, type = 'text', maxLength = 200) => <div className="field"><label htmlFor={`quote-${name}`}>{label} <span>*</span></label><input id={`quote-${name}`} name={name} type={type} placeholder={placeholder} maxLength={maxLength} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined} autoComplete={name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'off'} />{errors[name] && <span id={`error-${name}`} className="field-error">{errors[name]}</span>}</div>;
  return <section className="section-space" id="orcamento"><div className="container-shell quote-grid">
    <div className="quote-intro"><p className="eyebrow">O próximo passo começa aqui</p><h2>VAMOS PLANEAR<br />A SUA MUDANÇA?</h2><p>Conte-nos o que precisa. Vamos encontrar a solução mais adequada à sua próxima etapa.</p><div className="quote-detail"><MessageCircle /><div><strong>Uma conversa, uma solução.</strong><span>Atendimento atento às suas necessidades.</span></div></div><div className="quote-detail"><ShieldCheck /><div><strong>Os seus dados, com cuidado.</strong><span>Utilizados apenas para o seu pedido.</span></div></div></div>
    <form className="quote-form" onSubmit={submit} noValidate>
      {field('name', 'Nome', 'O seu nome', 'text', 100)}
      {field('phone', 'Número de telefone', 'O seu contacto', 'tel', 25)}
      {field('origin', 'Local de origem', 'De onde vai mudar?')}
      {field('destination', 'Local de destino', 'Para onde vai mudar?')}
      <div className="field"><label htmlFor="quote-service">Tipo de serviço <span>*</span></label><select id="quote-service" name="service" defaultValue="" required aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'error-service' : undefined}><option value="" disabled>Selecione o serviço</option>{serviceNames.map(s => <option key={s}>{s}</option>)}</select>{errors.service && <span id="error-service" className="field-error">{errors.service}</span>}</div>
      <div className="field"><label htmlFor="quote-date">Data pretendida <span>*</span></label><input id="quote-date" type="date" name="date" min={dateMin || undefined} required aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'error-date' : undefined} />{errors.date && <span id="error-date" className="field-error">{errors.date}</span>}</div>
      <div className="field full-field"><label htmlFor="quote-description">Descrição adicional <span>(opcional)</span></label><textarea id="quote-description" name="description" placeholder="Conte-nos mais sobre os bens, os acessos ou outras necessidades." maxLength={1500} aria-invalid={Boolean(errors.description)} />{errors.description && <span className="field-error">{errors.description}</span>}</div>
      <div className="form-bottom"><p>Os dados destinam-se apenas ao seu pedido de orçamento. Consulte a <Link to="/privacidade">política de privacidade</Link>.</p><Button type="submit" variant="brand" disabled={pending}>{pending ? 'A preparar…' : 'Preparar pedido de orçamento'} <ArrowUpRight /></Button></div>
      {message && <div className="quote-result" role="status"><h3>O seu pedido está preparado.</h3><p>{wa ? 'Reveja os dados e abra o WhatsApp. A mensagem só será enviada quando confirmar o envio na conversa.' : 'Não foi enviada nenhuma mensagem. O contacto oficial ainda aguarda confirmação; pode copiar o seu pedido.'}</p><textarea aria-label="Mensagem de orçamento preparada" readOnly value={message} />{wa ? <Button variant="brand" asChild><a href={wa} target="_blank" rel="noopener noreferrer">Enviar pelo WhatsApp <ArrowUpRight /></a></Button> : <Button variant="brand" type="button" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }}>{copied ? <Check /> : <Copy />}{copied ? 'Pedido copiado' : 'Copiar pedido'}</Button>}{copyError && <p className="field-error">Selecione a mensagem acima e copie-a manualmente.</p>}</div>}
    </form>
  </div></section>;
}
