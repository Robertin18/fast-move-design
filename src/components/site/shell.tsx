import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company, mapsUrl, whatsappUrl } from '@/lib/company';
import { Brand, WhatsAppIcon } from './brand';

const nav = [{ to: '/', label: 'Início' }, { to: '/servicos', label: 'Serviços' }, { to: '/sobre-nos', label: 'Sobre nós' }, { to: '/contactos', label: 'Contactos' }] as const;
export function SiteShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => { setMenu(false); }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const handle = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [menu]);
  const wa = whatsappUrl('Olá, FAST MUDANÇA! Gostaria de pedir um orçamento.');
  return <>
    <a href="#conteudo" className="skip-link">Saltar para o conteúdo</a>
    <header className={`site-header ${scrolled || pathname !== '/' || menu ? 'solid' : ''}`}>
      <div className="container-shell header-inner">
        <Link to="/" aria-label="FAST MUDANÇA — Início"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(item => <Link key={item.to} to={item.to} className={pathname === item.to ? 'active' : ''} aria-current={pathname === item.to ? 'page' : undefined}>{item.label}</Link>)}</nav>
        <Button variant="brand" asChild className="header-quote"><Link to="/contactos" hash="orcamento">Pedir orçamento <ArrowUpRight /></Link></Button>
        <Button variant="nav" className="menu-toggle" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
      </div>
      {menu && <nav className="mobile-menu" id="mobile-menu" aria-label="Navegação móvel">{nav.map(item => <Link key={item.to} to={item.to} onClick={() => setMenu(false)} aria-current={pathname === item.to ? 'page' : undefined}>{item.label}</Link>)}<Button variant="brand" asChild><Link to="/contactos" hash="orcamento" onClick={() => setMenu(false)}>Pedir orçamento <ArrowUpRight /></Link></Button></nav>}
    </header>
    <main id="conteudo">{children}</main>
    <footer className="site-footer">
      <div className="container-shell">
        <div className="footer-grid">
          <div className="footer-brand"><Link to="/" aria-label="FAST MUDANÇA — Início"><Brand /></Link><p>Mudanças e transporte de móveis.<br />Cuidado em cada detalhe. Simplicidade em cada etapa.</p></div>
          <div className="footer-column"><h3>Os nossos serviços</h3>{['Mudanças residenciais','Mudanças de apartamentos','Mudanças de escritórios','Transporte de móveis'].map((s, i) => <Link to="/servicos" hash={`servico-${i+1}`} key={s}>{s}</Link>)}</div>
          <div className="footer-column"><h3>Vamos falar?</h3>{company.phone && <a href={`tel:${company.phone.replace(/[\s()]/g, '')}`} className="footer-contact"><Phone size={14} />{company.phone}</a>}{company.email && <a href={`mailto:${company.email}`}><Mail size={14} /> {company.email}</a>}{wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="footer-contact"><WhatsAppIcon /> WhatsApp</a> : <Link to="/contactos" hash="orcamento" className="footer-contact">Pedir orçamento <ArrowUpRight size={13} /></Link>}{company.serviceArea && <p>{company.serviceArea}</p>}{company.location && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-contact"><MapPin size={14} /> {company.location}</a>}</div>
          <div className="footer-column"><h3>FAST MUDANÇA</h3><Link to="/sobre-nos">Sobre nós</Link><Link to="/contactos">Contactos</Link><Link to="/privacidade">Política de privacidade</Link>{company.social.map(s => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} FAST MUDANÇA. Todos os direitos reservados.</span><div><span>Fotografias ilustrativas.</span><Link to="/privacidade">Privacidade</Link></div></div>
      </div>
    </footer>
    {wa ? <a className="floating-whatsapp" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Pedir orçamento pelo WhatsApp"><WhatsAppIcon /><span className="float-label">Fale connosco</span></a> : <Link className="floating-whatsapp" to="/contactos" hash="orcamento" aria-label="Pedir orçamento"><WhatsAppIcon /><span className="float-label">Pedir orçamento</span></Link>}
  </>;
}
