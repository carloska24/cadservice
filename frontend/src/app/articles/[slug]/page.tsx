import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { MOCK_ARTICLES } from "@/data/mockArticles";

// Get article by slug from mock data
function getArticle(slug: string) {
  return MOCK_ARTICLES.find(a => a.slug === slug);
}

// Generate static params for all mock articles
export function generateStaticParams() {
  return MOCK_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

// Mock content for articles (longer content for detail pages)
const articleContents: Record<string, string> = {
  'dfm-evitar-retrabalho-montagem-smt': `
O Design for Manufacturing (DfM) é uma abordagem sistemática para projetar produtos de forma que sejam fáceis de fabricar. Na montagem SMT, aplicar princípios de DfM desde o início do projeto pode eliminar até 80% dos problemas que causam retrabalho na linha de produção.

## Por que o DfM é Crítico na SMT?

A montagem SMT (Surface Mount Technology) envolve processos altamente automatizados onde cada detalhe do design impacta diretamente a qualidade final. Pequenos erros no footprint dos componentes, espaçamento inadequado ou orientação incorreta podem resultar em:

- Tombstoning de componentes passivos
- Pontes de solda em componentes fine-pitch
- Desalinhamento de BGAs
- Falhas de soldagem por perfil térmico inadequado

## Os 15 Erros Mais Comuns

### 1. Footprints Incorretos
Muitos designers usam bibliotecas genéricas sem verificar as recomendações do fabricante do componente. Sempre valide o Land Pattern com o datasheet específico.

### 2. Espaçamento Insuficiente
Para processos SMT típicos, mantenha pelo menos 0.15mm entre pads de componentes adjacentes. Para componentes maiores, considere 0.25mm.

### 3. Ausência de Fiduciais
Fiduciais globais e locais são essenciais para alinhamento da Pick & Place. Inclua pelo menos 3 fiduciais globais e fiduciais locais próximos a BGAs e QFPs.

### 4. Via-in-Pad sem Preenchimento
Vias nos pads sem preenchimento causam perda de pasta de solda durante o reflow. Use via-in-pad filled and capped quando necessário.

### 5. Orientation Marks Ausentes
Polarity indicators para capacitores, diodos e ICs são essenciais para evitar montagem invertida.

## Como Estruturar Seus Arquivos

### Gerber Files
Certifique-se de incluir todas as camadas necessárias:
- Top/Bottom Copper
- Top/Bottom Solder Mask
- Top/Bottom Silkscreen
- Drill File (Excellon)
- Board Outline

### BOM (Bill of Materials)
Seu BOM deve conter:
- Part Number do Fabricante
- Descrição completa
- Package/Footprint
- Designator
- Quantidade
- Alternativas aprovadas (AVL)

## Checklist de Validação Pré-Produção

Antes de enviar seus arquivos para a CM:
1. ✅ Execute DRC com regras de manufatura
2. ✅ Verifique clearance térmico para componentes de potência
3. ✅ Confirme orientação de todos os polarity components
4. ✅ Valide footprints contra datasheets
5. ✅ Inclua assembly drawings com notas

## Conclusão

Investir tempo em DfM antes de iniciar a produção economiza significativamente em retrabalho, scrap e atrasos. A CADService oferece análise de DfM gratuita como parte de nosso processo de cotação.
  `,
  'checklist-npi-20-itens-lote-piloto': `
A transição do protótipo para o lote piloto é um dos momentos mais críticos no desenvolvimento de um produto eletrônico. Este checklist foi desenvolvido com base em mais de 200 projetos NPI que acompanhamos nos últimos 5 anos.

## Fase 1: Documentação Técnica

### 1. BOM Finalizada
- [ ] Todos os part numbers confirmados
- [ ] Alternativas aprovadas (AVL) documentadas
- [ ] Lead times verificados

### 2. Arquivos Gerber Versionados
- [ ] Versão final assinada
- [ ] Todas as camadas exportadas
- [ ] Drill file incluido

### 3. Assembly Drawing
- [ ] Orientação de componentes indicada
- [ ] Notas de processo incluídas
- [ ] Áreas de keep-out demarcadas

### 4. Esquemático PDF
- [ ] Última revisão
- [ ] Net names consistentes com layout

### 5. Especificação de Testes
- [ ] Test points definidos
- [ ] Cobertura esperada documentada
- [ ] Critérios de pass/fail

## Fase 2: Validação de Componentes

### 6. Amostras Críticas Recebidas
- [ ] Todos os componentes de longo lead time
- [ ] First article de novos fornecedores

### 7. Verificação de Moisture Sensitivity
- [ ] MSL de cada componente identificado
- [ ] Procedimento de bake definido

### 8. Compatibilidade Lead-Free
- [ ] Todos os componentes Pb-free confirmados
- [ ] Exceções documentadas com justificativa

## Fase 3: Processo de Fabricação

### 9. Stencil Especificado
- [ ] Espessura definida
- [ ] Step stencil se necessário
- [ ] Aperture modifications documentadas

### 10. Perfil de Reflow
- [ ] Profile teórico calculado
- [ ] Máxima temperatura dos componentes verificada

### 11. Jiga de Teste
- [ ] Design aprovado
- [ ] Fabricação iniciada ou concluída

## Fase 4: Qualidade

### 12. Critérios IPC Definidos
- [ ] Classe 2 ou Classe 3 especificada
- [ ] Exceções documentadas

### 13. Plano de Inspeção
- [ ] AOI coverage definida
- [ ] X-Ray para BGAs se aplicável

### 14. Critérios de Aceitação
- [ ] Tabela de defeitos críticos/maiores/menores
- [ ] Decisão tree para anomalias

## Fase 5: Supply Chain

### 15. Procurement Confirmado
- [ ] Todos os componentes em estoque ou em trânsito
- [ ] Risco de EOL verificado

### 16. Second Source Estratégia
- [ ] Componentes críticos com alternativa
- [ ] Qualificação de segunda fonte planejada

## Conclusão

Seguir este checklist sistematicamente reduz o risco de surpresas durante o lote piloto e acelera a transição para produção em volume.
  `,
  'ipc-a-610-classe-2-vs-classe-3': `
O padrão IPC-A-610 "Acceptability of Electronic Assemblies" é a referência global para critérios de qualidade em montagem de placas eletrônicas. Entender as diferenças entre as classes é essencial para especificar corretamente os requisitos do seu produto.

## As Três Classes do IPC-A-610

### Classe 1 - General Electronic Products
Produtos de consumo onde a função é garantida, mas a cosmética não é crítica. Exemplos: controles remotos, brinquedos eletrônicos.

### Classe 2 - Dedicated Service Electronic Products
Produtos onde há expectativa de vida útil prolongada e desempenho confiável, mas não são críticos para a vida. Exemplos: equipamentos industriais, telecomunicações, computadores.

### Classe 3 - High Performance Electronic Products
Produtos onde a falha não é tolerada, frequentemente usados em aplicações críticas para a vida ou missão. Exemplos: equipamentos médicos implantáveis, aviônicos, sistemas militares.

## Comparação de Critérios

| Critério | Classe 2 | Classe 3 |
|----------|----------|----------|
| Solda mínima (fillet) | 75% da altura do lead | 100% da altura do lead |
| Excesso de solda | Permitido até 1mm acima do componente | Não pode exceder lead |
| Voids em BGA | < 25% por junta | < 9% por junta |
| Pontes de solda | Rejeitável | Rejeitável |
| Tombstoning | Rejeitável se > 90° | Qualquer tombstone rejeitável |

## Impacto no Processo

### Custo
Passar de Classe 2 para Classe 3 pode aumentar o custo de produção em 15-40% devido a:
- Tempo adicional de inspeção
- Taxa de rejeição maior
- Necessidade de X-Ray mais frequente
- Operadores mais qualificados

### Lead Time
Classe 3 tipicamente adiciona 2-3 dias ao ciclo de produção para:
- Inspeção mais rigorosa
- Documentação adicional
- Rastreabilidade completa

## Quando Escolher Cada Classe

### Escolha Classe 2 quando:
- O produto opera em ambiente controlado
- Manutenção é possível e prevista
- Custo é uma restrição significativa
- Não há risco para a vida humana

### Escolha Classe 3 quando:
- Falha pode causar risco à vida
- O produto opera em ambiente hostil
- Manutenção não é possível (ex: satélites)
- Requisitos regulatórios exigem

## Dica Importante

Você pode especificar Classe 2 com exceções pontuais de Classe 3 para circuitos críticos específicos. Isso otimiza custo enquanto garante confiabilidade onde importa.

## Conclusão

A escolha da classe IPC deve ser uma decisão de engenharia baseada em análise de risco, não apenas uma preferência. Consulte sua CM para entender as implicações específicas para seu projeto.
  `,
};

// Default content for articles without specific content
const defaultContent = `
Este artigo está em desenvolvimento. O conteúdo completo será publicado em breve.

Enquanto isso, entre em contato com nossa equipe de engenharia para discutir este tópico em detalhes.

## O que você vai aprender

- Conceitos fundamentais do tema
- Aplicações práticas na indústria EMS
- Melhores práticas recomendadas
- Cases reais de implementação

## Próximos Passos

Interessado em saber mais sobre este assunto? Nossa equipe está disponível para uma conversa técnica sem compromisso.
`;

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const content = articleContents[slug] || defaultContent;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-8 pb-16">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/articles" className="hover:text-white transition-colors">Knowledge Hub</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-500 truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-${article.categoryColor}-500/20 text-${article.categoryColor}-400`}>
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime} min de leitura
            </span>
            {article.views && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString('pt-BR')} visualizações
              </span>
            )}
            {article.author && (
              <span>
                Por <span className="text-white font-medium">{article.author.name}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-4xl">
          {/* Cover Image */}
          {article.coverImage && (
            <div className="mb-10 -mt-24 relative z-10">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Excerpt */}
          <div className="mb-10 p-6 bg-slate-50 rounded-xl border-l-4 border-primary">
            <p className="text-lg text-slate-700 leading-relaxed italic">
              {article.excerpt}
            </p>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg prose-slate max-w-none">
            {content.split('\n\n').map((paragraph, idx) => {
              // Handle headers
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold text-slate-900 mt-8 mb-3">{paragraph.replace('### ', '')}</h3>;
              }
              // Handle lists
              if (paragraph.includes('- [ ]') || paragraph.includes('- [x]')) {
                const items = paragraph.split('\n').filter(line => line.trim());
                return (
                  <ul key={idx} className="space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        {item.includes('[x]') ? (
                          <span className="text-green-600 font-bold">✓</span>
                        ) : (
                          <span className="text-slate-400">○</span>
                        )}
                        <span>{item.replace(/- \[.?\] /, '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              // Handle bullet points
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1 my-4 text-slate-700">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              // Handle numbered lists
              if (/^\d+\./.test(paragraph.trim())) {
                const items = paragraph.split('\n').filter(line => /^\d+\./.test(line.trim()));
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-1 my-4 text-slate-700">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              // Handle tables (simple detection)
              if (paragraph.includes('|')) {
                const lines = paragraph.split('\n').filter(line => line.includes('|'));
                if (lines.length > 1) {
                  const headers = lines[0].split('|').filter(cell => cell.trim());
                  const rows = lines.slice(2).map(line => line.split('|').filter(cell => cell.trim()));
                  return (
                    <div key={idx} className="my-6 overflow-x-auto">
                      <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
                        <thead className="bg-slate-100">
                          <tr>
                            {headers.map((header, i) => (
                              <th key={i} className="px-4 py-2 text-left text-sm font-bold text-slate-700 border-b">
                                {header.trim()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2 text-sm text-slate-600 border-b">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }
              // Regular paragraph
              if (paragraph.trim()) {
                return <p key={idx} className="text-slate-700 leading-relaxed mb-4">{paragraph.trim()}</p>;
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 mr-2">Tags:</span>
              {[article.category, 'DfM', 'Manufatura'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Knowledge Hub
            </Link>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tem dúvidas sobre este tópico?
          </h2>
          <p className="text-slate-300 mb-8">
            Nossa equipe de engenharia está disponível para discutir seu projeto específico.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contacts" 
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-bold text-white shadow-lg hover:bg-primary/90 transition-all"
            >
              Falar com Engenharia
            </Link>
            <Link 
              href="/budget" 
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 font-medium text-white hover:bg-white/10 transition-all"
            >
              Solicitar Cotação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
