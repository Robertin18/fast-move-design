import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, CareSection, DifferenceBand, Conversion } from '@/components/site/sections';
import { pageHead } from '@/lib/page-meta';
export const Route = createFileRoute('/sobre-nos')({
  head: () => pageHead('Sobre nós', 'Na FAST MUDANÇA, cada detalhe merece atenção. Conheça o nosso compromisso com mudanças organizadas, cuidado com os seus bens e atendimento personalizado.', '/sobre-nos'),
  component: AboutPage,
});
function AboutPage() { return <><PageHeading eyebrow="Conheça a FAST MUDANÇA" title="A SUA PRÓXIMA ETAPA. O NOSSO COMPROMISSO." description="Somos a FAST MUDANÇA. Dedicamo-nos a mudanças e transporte de móveis, com atenção às necessidades de cada cliente e ao cuidado dos seus bens." /><CareSection /><DifferenceBand /><Conversion /></>; }
