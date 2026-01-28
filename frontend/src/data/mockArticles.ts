import type { ArticleData } from '@/components/articles/FeaturedArticle';

// Dados mockados realistas para uma empresa EMS brasileira
export const MOCK_ARTICLES: ArticleData[] = [
  // FEATURED
  {
    id: '1',
    slug: 'dfm-evitar-retrabalho-montagem-smt',
    title: 'DfM na Prática: Como Evitar Retrabalho na Primeira Montagem SMT',
    excerpt: 'Aprenda a estruturar seus arquivos Gerber e BOM corretamente para eliminar defeitos antes de chegar na linha de produção. Este guia cobre os 15 erros mais comuns que identificamos em projetos de clientes e como preveni-los no design.',
    coverImage: '/images/articles/dfm-smt-cover.jpg',
    category: 'SMT/PCBA',
    categoryColor: 'blue',
    readTime: 12,
    publishedAt: '2026-01-15',
    views: 4250,
    featured: true,
    author: {
      name: 'Eng. Ricardo Santos',
    }
  },
  
  // NPI
  {
    id: '2',
    slug: 'checklist-npi-20-itens-lote-piloto',
    title: 'Checklist NPI: 20 Itens Críticos Antes do Lote Piloto',
    excerpt: 'Um checklist completo para engenheiros de produto verificarem antes de aprovar a transição do protótipo para o lote piloto. Evite surpresas na industrialização com esta lista validada em mais de 200 projetos.',
    coverImage: '/images/articles/npi-checklist-cover.jpg',
    category: 'NPI',
    categoryColor: 'indigo',
    readTime: 8,
    publishedAt: '2026-01-12',
    views: 2890,
    author: {
      name: 'Eng. Fernanda Lima',
    }
  },
  
  // IPC/QA
  {
    id: '3',
    slug: 'ipc-a-610-classe-2-vs-classe-3',
    title: 'IPC-A-610: Quando Escolher Classe 2 ou Classe 3 para Seu Projeto?',
    excerpt: 'Guia completo para entender os níveis de qualidade IPC e como a escolha correta pode impactar custo, confiabilidade e lead time do seu produto. Inclui tabela comparativa de critérios de aceitação.',
    coverImage: '/images/articles/ipc-classes-cover.jpg',
    category: 'IPC/QA',
    categoryColor: 'green',
    readTime: 10,
    publishedAt: '2026-01-08',
    views: 1980,
    author: {
      name: 'Eng. Carlos Mendes',
    }
  },
  
  // SUPPLY CHAIN
  {
    id: '4',
    slug: 'escassez-componentes-estrategias-2026',
    title: 'Escassez de Componentes em 2026: Estratégias de Mitigação',
    excerpt: 'Análise do cenário atual de supply chain para componentes eletrônicos e estratégias práticas para gerentes de suprimentos minimizarem riscos de desabastecimento e aumentarem a resiliência da BOM.',
    coverImage: '/images/articles/supply-chain-cover.jpg',
    category: 'Supply Chain',
    categoryColor: 'amber',
    readTime: 7,
    publishedAt: '2026-01-05',
    views: 1560,
    author: {
      name: 'Ana Paula Ribeiro',
    }
  },
  
  // TENDÊNCIAS
  {
    id: '5',
    slug: 'ia-manufatura-eletronica-casos-reais',
    title: 'IA na Manufatura Eletrônica: 5 Casos Reais de Aplicação',
    excerpt: 'Como a inteligência artificial está transformando processos de inspeção AOI, previsão de defeitos e otimização de linhas SMT. Conheça cases de implementação e resultados mensuráveis.',
    coverImage: '/images/articles/ai-manufacturing-cover.jpg',
    category: 'Tendências',
    categoryColor: 'purple',
    readTime: 9,
    publishedAt: '2026-01-02',
    views: 3420,
    author: {
      name: 'Eng. Ricardo Santos',
    }
  },
  
  // SMT/PCBA
  {
    id: '6',
    slug: 'como-ler-arquivos-gerber-guia-completo',
    title: 'Como Ler Arquivos Gerber: Guia Completo para Engenheiros',
    excerpt: 'Tutorial passo a passo para interpretar arquivos Gerber, entender camadas, verificar DRC e identificar problemas antes de enviar para fabricação. Inclui ferramentas gratuitas recomendadas.',
    coverImage: '/images/articles/gerber-tutorial-cover.jpg',
    category: 'SMT/PCBA',
    categoryColor: 'blue',
    readTime: 15,
    publishedAt: '2025-12-28',
    views: 5670,
    author: {
      name: 'Eng. Fernanda Lima',
    }
  },
  
  // ENGENHARIA
  {
    id: '7',
    slug: 'bga-vs-qfn-qual-encapsulamento-escolher',
    title: 'BGA vs QFN: Qual Encapsulamento Escolher para Seu Processador?',
    excerpt: 'Comparação técnica entre Ball Grid Array e Quad Flat No-leads: dissipação térmica, custo de montagem, reparo, inspeção por raio-X e considerações de design. Decisões baseadas em dados.',
    coverImage: '/images/articles/bga-qfn-cover.jpg',
    category: 'Engenharia',
    categoryColor: 'red',
    readTime: 11,
    publishedAt: '2025-12-22',
    views: 4100,
    author: {
      name: 'Eng. Carlos Mendes',
    }
  },
  
  // BOX BUILD
  {
    id: '8',
    slug: 'ip67-vedacao-produtos-eletronicos',
    title: 'IP67 na Prática: Como Projetar Vedação para Produtos Eletrônicos',
    excerpt: 'Guia de engenharia para atingir classificação IP67 em produtos eletrônicos: escolha de gaskets, design de encaixe, testes de validação e erros comuns que comprometem a vedação.',
    coverImage: '/images/articles/ip67-sealing-cover.jpg',
    category: 'Box Build',
    categoryColor: 'slate',
    readTime: 13,
    publishedAt: '2025-12-18',
    views: 1870,
    author: {
      name: 'Eng. Ricardo Santos',
    }
  },
  
  // IPC/QA
  {
    id: '9',
    slug: 'lead-free-vs-leaded-mitos-verdades',
    title: 'Lead-Free vs Leaded: Mitos e Verdades sobre Solda sem Chumbo',
    excerpt: 'Desmistificando a soldagem lead-free: diferenças reais de confiabilidade, perfis térmicos, compatibilidade de materiais e quando ainda faz sentido usar solda com chumbo (RoHS exemption).',
    coverImage: '/images/articles/lead-free-cover.jpg',
    category: 'IPC/QA',
    categoryColor: 'green',
    readTime: 8,
    publishedAt: '2025-12-15',
    views: 2340,
    author: {
      name: 'Eng. Fernanda Lima',
    }
  },
  
  // SMT/PCBA
  {
    id: '10',
    slug: 'stencil-smt-tipos-espessuras',
    title: 'Stencil SMT: Tipos, Espessuras e Como Escolher o Ideal',
    excerpt: 'Guia prático sobre stencils para impressão de pasta de solda: laser-cut vs eletroformado, espessuras para diferentes componentes (01005, BGA, QFP), tratamentos Nano-coating e step stencils.',
    coverImage: '/images/articles/stencil-smt-cover.jpg',
    category: 'SMT/PCBA',
    categoryColor: 'blue',
    readTime: 10,
    publishedAt: '2025-12-10',
    views: 1650,
    author: {
      name: 'Eng. Carlos Mendes',
    }
  },
  
  // SUPPLY CHAIN
  {
    id: '11',
    slug: 'segunda-fonte-componentes-bom-avl',
    title: 'Segunda Fonte: Como Estruturar AVL para Minimizar Riscos',
    excerpt: 'Estratégias para criar uma Approved Vendor List robusta, qualificar alternativas de componentes e garantir continuidade de produção mesmo em cenários de escassez ou descontinuidade.',
    coverImage: '/images/articles/avl-strategy-cover.jpg',
    category: 'Supply Chain',
    categoryColor: 'amber',
    readTime: 9,
    publishedAt: '2025-12-05',
    views: 1290,
    author: {
      name: 'Ana Paula Ribeiro',
    }
  },
  
  // NPI
  {
    id: '12',
    slug: 'teste-funcional-jiga-fct-guia',
    title: 'Jiga de Teste Funcional (FCT): Do Conceito à Validação',
    excerpt: 'Como especificar, desenvolver e validar uma jiga de teste funcional eficiente. Cobrimos pontos de teste, cobertura, tempo de ciclo, manutenção e integração com sistemas de rastreabilidade.',
    coverImage: '/images/articles/fct-jig-cover.jpg',
    category: 'NPI',
    categoryColor: 'indigo',
    readTime: 14,
    publishedAt: '2025-12-01',
    views: 980,
    author: {
      name: 'Eng. Ricardo Santos',
    }
  },
];

// Artigos ordenados por visualizações (para sidebar "Mais Lidos")
export const POPULAR_ARTICLES = [...MOCK_ARTICLES].sort((a, b) => (b.views || 0) - (a.views || 0));

// Artigo em destaque
export const FEATURED_ARTICLE = MOCK_ARTICLES.find(a => a.featured) || MOCK_ARTICLES[0];

// Artigos sem o destaque (para o grid principal)
export const GRID_ARTICLES = MOCK_ARTICLES.filter(a => !a.featured);
