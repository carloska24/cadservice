"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
async function main() {
    console.log('🌱 Starting Services Seeding...');
    // 1. SMT Assembly
    const smt = await prisma.service.upsert({
        where: { slug: 'smt' },
        update: {},
        create: {
            title: 'Montagem SMT de Alta Precisão',
            slug: 'smt',
            category: 'EMS',
            shortDescription: 'De 01005 a BGA uPitch. Linhas automatizadas Fuji/Panasonic configuradas para troca rápida (High-Mix) e volume escalável.',
            fullDescription: `
        Nosso parque de máquinas é padronizado para garantir repetibilidade. 
        Processamos desde placas rígidas até flex-rigid complexas.
        
        Especificações Técnicas:
        - 150k CPH Speed
        - 01005 Min Component
        - 100% 3D SPI & AOI
        - Reflow com Nitrogênio (N2)
      `,
            technicalSpecs: {
                componentRange: '01005 (Imperial) até conectores de 150mm',
                icPackages: 'BGA, uBGA (0.3mm pitch), QFN, CSP, PoP, LGA',
                maxPcbSize: '510mm x 460mm (L)',
                pcbThickness: '0.4mm a 4.0mm (Suporte a Heavy Copper)',
                accuracy: 'Chips: ±0.035mm / QFP: ±0.025mm (Cpk ≥ 1.33)'
            }
        },
    });
    // 2. Box Build
    const boxBuild = await prisma.service.upsert({
        where: { slug: 'box-build' },
        update: {},
        create: {
            title: 'Integração de Sistemas (Box Build)',
            slug: 'box-build',
            category: 'EMS',
            shortDescription: 'Entregamos seu produto pronto para o usuário final. Montagem mecânica, cabeamento, carga de firmware e embalagem de varejo.',
            fullDescription: `
        Escopo Completo de Montagem:
        1. Sub-Assembly: Pré-montagem de cabos, displays e potting.
        2. System Integration: União PCBA + Gabinete, controle de torque.
        3. Packout & Logistics: Embalagem final e envio direto (DropShipping).
        
        Controle de Qualidade:
        - Testes Funcionais (FCT)
        - Serialização e Rastreabilidade
        - Gestão de BOM Mista (Eletrônica + Mecânica)
      `
        },
    });
    // 3. NPI (Industrialization)
    const npi = await prisma.service.upsert({
        where: { slug: 'npi' },
        update: {},
        create: {
            title: 'Industrialização de Produtos Eletrônicos (NPI)',
            slug: 'npi',
            category: 'Engineering',
            shortDescription: 'Transformamos protótipos funcionais em produtos manufaturáveis. A ponte segura entre engenharia e produção em massa.',
            fullDescription: `
        Engenharia de Front-End que blinda seu investimento antes da produção.
        
        Metodologia Stage-Gate:
        Gate 1: DfX Review (DFM, BOM Analysis)
        Gate 2: Build Pack (Process Docs, Jigas)
        Gate 3: Pilot Run (Setup Real, Golden Sample)
        
        Resultados Típicos:
        - Redução de 30% no Custo de BOM
        - Zero Lote Rejeitado no lançamento
      `
        },
    });
    console.log('✅ Seeding finished.');
    console.log(`Created/Updated services: ${smt.title}, ${boxBuild.title}, ${npi.title}`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
