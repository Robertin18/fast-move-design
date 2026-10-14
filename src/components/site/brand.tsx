export function Brand() {
  return <span className="brand-logo"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span className="brand-word"><strong>FAST</strong><small>MUDANÇA</small></span></span>;
}
export function WhatsAppIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" /><path d="M8.2 7.3c.4-.3.8-.1 1 .4l.7 1.5c.2.4-.1.7-.5 1.2.6 1.3 1.7 2.4 3 3 .5-.5.9-1 1.3-.8l1.7.8c.5.2.6.6.3 1-.5.8-1.2 1.1-2.1.9-3-.7-5.8-3.2-6.5-6.1-.2-.8.3-1.5 1.1-1.9Z" /></svg>;
}
