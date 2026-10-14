import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Services, Process, Conversion } from '@/components/site/sections';
import { pageHead } from '@/lib/page-meta';
export const Route = createFileRoute('/servicos')({
  head: () => pageHead('Serviços de mudanças', 'Conheça os serviços da FAST MUDANÇA: mudanças residenciais, de apartamentos e escritórios, e transporte de móveis. Peça o seu orçamento.', '/servicos'),
  component: ServicesPage,
});
function ServicesPage() { return <><PageHeading eyebrow="FAST MUDANÇA · Os nossos serviços" title="UMA SOLUÇÃO À SUA MEDIDA." description="Da sua casa ao seu espaço de trabalho, cada mudança merece um planeamento cuidado e uma solução adaptada." /><Services /><Process /><Conversion /></>; }
