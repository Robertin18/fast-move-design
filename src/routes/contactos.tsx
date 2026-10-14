import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/site/sections';
import { QuoteForm } from '@/components/site/quote-form';
import { pageHead } from '@/lib/page-meta';
export const Route = createFileRoute('/contactos')({
  head: () => pageHead('Contactos e orçamento', 'Planeie a sua mudança com a FAST MUDANÇA. Indique a origem, o destino, o serviço e a data pretendida para preparar o seu pedido de orçamento.', '/contactos'),
  component: ContactsPage,
});
function ContactsPage() { return <><PageHeading eyebrow="FAST MUDANÇA · Contactos" title="A SUA MUDANÇA COMEÇA COM UMA CONVERSA." description="Diga-nos o que precisa e prepare o seu pedido de orçamento. Cada nova etapa começa com um primeiro passo." /><QuoteForm /></>; }
