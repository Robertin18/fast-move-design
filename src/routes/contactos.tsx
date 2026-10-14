import { createFileRoute } from '@tanstack/react-router';
import { ContactPanel, PageHeading } from '@/components/site/sections';
import { QuoteForm } from '@/components/site/quote-form';
import { pageHead } from '@/lib/page-meta';
export const Route = createFileRoute('/contactos')({
  head: () => pageHead('Contactos e orçamento', 'Fale com a FAST MUDANÇA por telefone, WhatsApp ou presencialmente em Amora. Prepare o seu pedido de orçamento indicando origem, destino, serviço e data.', '/contactos'),
  component: ContactsPage,
});
function ContactsPage() { return <><PageHeading eyebrow="FAST MUDANÇA · Contactos" title="A SUA MUDANÇA COMEÇA COM UMA CONVERSA." description="Diga-nos o que precisa e prepare o seu pedido de orçamento. Cada nova etapa começa com um primeiro passo." /><ContactPanel /><QuoteForm /></>; }
