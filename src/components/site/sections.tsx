import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, ShieldCheck, PackageCheck, CalendarDays, Users, ClipboardList, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company, mapsUrl, whatsappUrl } from '@/lib/company';
import { WhatsAppIcon } from './brand';
import heroImage from '@/assets/moving-hero.jpg';
import residentialImage from '@/assets/residential.jpg';
import careImage from '@/assets/care.jpg';
import officeImage from '@/assets/office.jpg';

export function Hero() {
  return <section className="hero" aria-label="FAST MUDANÇA — mudanças e transporte de móveis">
    <img className="hero-photo" src={heroImage} width={1920} height={1024} alt="Profissionais a transportar cuidadosamente uma poltrona para uma carrinha junto a uma residência contemporânea" fetchPriority="high" />
    <div className="container-shell hero-inner"><div className="reveal"><p className="eyebrow">FAST MUDANÇA · SERVIÇOS DE MUDANÇAS</p><h1>MUDAR DE CASA.<br /><span>SEM COMPLICAÇÕES.</span></h1><p className="hero-copy">Tratamos da sua mudança com organização, cuidado e profissionalismo. Você prepara a próxima etapa. Nós tratamos do resto.</p><div className="hero-actions"><Button variant="brand" asChild><Link to="/contactos" hash="orcamento">Pedir orçamento <ArrowUpRight /></Link></Button><Button variant="heroOutline" asChild><Link to="/servicos">Conhecer os serviços <ArrowUpRight /></Link></Button></div></div><div className="hero-bottom"><a className="explore-link" href="#servicos"><ArrowDown size={19} /> EXPLORE A SUA PRÓXIMA ETAPA</a><span className="hero-bottom-note"><ShieldCheck /> Cuidado em cada detalhe.</span></div></div>
  </section>;
}
export function DifferenceBand() {
  const items = [{ Icon: ShieldCheck, text: 'Cuidado com os seus bens' }, { Icon: CalendarDays, text: 'Planeamento organizado' }, { Icon: Users, text: 'Atendimento personalizado' }, { Icon: ClipboardList, text: 'Orçamento adaptado à mudança' }];
  return <section className="difference-band" aria-label="O que nos distingue"><div className="container-shell difference-grid">{items.map(({Icon,text}) => <div className="difference-item" key={text}><Icon /><span>{text}</span></div>)}</div></section>;
}
const services = [
  { name: 'Mudanças residenciais', description: 'Transporte dos seus bens para uma nova casa, com atenção ao cuidado e à organização.', image: residentialImage, alt: 'Profissional a transportar uma caixa numa casa luminosa' },
  { name: 'Mudanças de apartamentos', description: 'Soluções adaptadas à mudança de apartamentos, considerando acessos, elevadores e logística.', image: careImage, alt: 'Equipa a transportar uma poltrona protegida num apartamento' },
  { name: 'Mudanças de escritórios', description: 'Transporte de mobiliário e equipamentos para a mudança do seu espaço profissional.', image: officeImage, alt: 'Transporte organizado de caixas num escritório contemporâneo' },
  { name: 'Transporte de móveis', description: 'Transporte de mobiliário e outros bens, de acordo com as necessidades de cada cliente.', image: heroImage, alt: 'Móvel cuidadosamente protegido a ser colocado numa carrinha' },
];
export function Services() {
  return <section className="section-space" id="servicos"><div className="container-shell"><div className="section-heading"><div><p className="eyebrow">O que fazemos</p><h2>SOLUÇÕES PARA CADA MUDANÇA.</h2></div><p className="section-description">Cada mudança é diferente. O nosso objetivo é tornar todo o processo mais simples, desde o primeiro contacto até à entrega dos seus bens.</p></div><div className="services-grid">{services.map((s,i) => <article className="service-card" key={s.name} id={`servico-${i+1}`}><div className="service-photo"><img src={s.image} width={1024} height={1024} alt={s.alt} loading="lazy" /><span className="service-index">0{i+1}</span></div><div className="service-body"><h3>{s.name}</h3><p>{s.description}</p><Button variant="text" asChild><Link to="/contactos" hash="orcamento" aria-label={`Pedir orçamento — ${s.name}`}>Pedir orçamento <ArrowUpRight /></Link></Button></div></article>)}</div></div></section>;
}
export function CareSection() {
  return <section className="care-section"><div className="container-shell care-grid"><div className="care-picture"><img src={careImage} alt="Dois profissionais protegem e transportam uma poltrona com uma manta" width={1024} height={1024} loading="lazy" /><div className="photo-caption"><PackageCheck /><span>Mais do que transportar.<br /><strong>Cuidar do que é seu.</strong></span></div></div><div className="care-copy"><p className="eyebrow">Uma mudança com atenção</p><h2>OS SEUS BENS.<br /><span>O NOSSO CUIDADO.</span></h2><p>Uma mudança envolve muito mais do que transportar objetos. Envolve histórias, memórias e o início de uma nova etapa. Por isso, cada detalhe merece atenção.</p><Button variant="brand" asChild><Link to="/contactos">Fale connosco <ArrowUpRight /></Link></Button></div></div></section>;
}
export function Process() {
  const steps = [{ title: 'Conte-nos o que precisa', text: 'Indique os locais, a data pretendida e o tipo de mudança.' }, { title: 'Receba o seu orçamento', text: 'Analisamos as informações e apresentamos uma proposta ajustada ao serviço solicitado.' }, { title: 'Prepare-se para mudar', text: 'Depois de confirmar os detalhes e o agendamento, organizamos o serviço consigo.' }];
  return <section className="section-space"><div className="container-shell"><div className="process-heading"><p className="eyebrow">Simples, do início ao fim</p><h2>A SUA MUDANÇA EM 3 PASSOS.</h2></div><ol className="process-grid">{steps.map((step,i) => <li className="process-step" key={step.title}><div className="process-number"><span>0{i+1}</span></div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>;
}
export function Conversion() {
  const wa = whatsappUrl(`Olá, ${company.name}! Gostaria de pedir um orçamento para uma mudança.`);
  return <section className="conversion"><img src={heroImage} width={1920} height={1024} loading="lazy" alt="Carrinha de mudanças" /><div className="container-shell conversion-inner"><div><h2>ESTÁ NA ALTURA DE MUDAR?</h2><p>Dê o primeiro passo para uma mudança mais simples.<br />Entre em contacto e peça o seu orçamento.</p></div><Button variant="brand" asChild>{wa ? <a href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Pedir orçamento pelo WhatsApp <ArrowUpRight /></a> : <Link to="/contactos" hash="orcamento"><WhatsAppIcon /> Pedir orçamento pelo WhatsApp <ArrowUpRight /></Link>}</Button></div></section>;
}
export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-top"><div className="container-shell reveal"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></section>;
}
export function ContactPanel() {
  const wa = whatsappUrl(`Olá, ${company.name}! Gostaria de pedir um orçamento.`);
  return <section className="contact-panel" aria-label="Contactos FAST MUDANÇA"><div className="container-shell contact-grid">
    {company.phone && <a className="contact-item" href={`tel:${company.phone.replace(/[\s()]/g, '')}`}><Phone /><div><strong>Telefone</strong><span>{company.phone}</span></div><ArrowUpRight className="contact-arrow" /></a>}
    {wa && <a className="contact-item" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><div><strong>WhatsApp</strong><span>Envie o seu pedido e fale connosco.</span></div><ArrowUpRight className="contact-arrow" /></a>}
    {company.location && <a className="contact-item" href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin /><div><strong>Localização</strong><span>{company.location}</span></div><ArrowUpRight className="contact-arrow" /></a>}
  </div></section>;
}
