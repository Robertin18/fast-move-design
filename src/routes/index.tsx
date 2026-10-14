import { createFileRoute } from '@tanstack/react-router';
import { Hero, DifferenceBand, Services, CareSection, Process, Conversion } from '@/components/site/sections';
import { QuoteForm } from '@/components/site/quote-form';
import { pageHead } from '@/lib/page-meta';
export const Route = createFileRoute('/')({
  head: () => pageHead('Mudanças e transporte de móveis', 'A FAST MUDANÇA trata da sua mudança residencial, de apartamento ou escritório com organização e cuidado. Peça um orçamento ajustado às suas necessidades.', '/'),
  component: Index,
});
function Index() { return <><Hero /><DifferenceBand /><Services /><CareSection /><Process /><Conversion /><QuoteForm /></>; }
