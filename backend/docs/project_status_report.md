# Relatório de Status do Projeto - CADService Backend

## 📍 Onde Estamos (Progresso Atual)

O Core do Backend está estabelecido. Os dois principais módulos de negócio (Orçamentos e Serviços) estão funcionais, com APIs Públicas e Administrativas implementadas e testadas.

### ✅ Concluído (Done)

1.  **Fundação & Infraestrutura**:
    - Setup NestJS + TypeScript + Prisma v7 (Adapter `pg`).
    - Banco de Dados PostgreSQL com schema definido e migrado.
    - Integração com Google Cloud Storage (GCS) via Signed URLs.
2.  **Módulo de Leads (`BudgetRequest`)**:
    - **Público**: API para criação de orçamentos e upload de anexos.
    - **Admin**: API para listagem, detalhes e atualização de status.
    - **Traceability**: Logs de auditoria (`AuditLog`) automáticos na troca de status.
3.  **Módulo de Serviços (`Services`)**:
    - **Catalógo**: CRUD completo de serviços industriais.
    - **Público**: Listagem e busca por Slug amigável.
    - **Admin**: Gestão completa (Specs técnicas em JSONB).

### 🚧 O que Falta (Backlog)

- [ ] **Módulo de Autenticação (`Auth`)**: Login de admin, JWT, Proteção de rotas `/admin`.
- [ ] **Módulo de Usuários (`Users`)**: Gestão de administradores.

4.  **Módulo de Portfólio (`PortfolioProject`)**:
    - **Público**: Listagem e detalhes de projetos.
    - **Admin**: CRUD completo.

- [ ] **Módulo de Conteúdo (`Article`)**: Blog técnico.

---

## 🎯 Próximo Endereço Lógico: Autenticação (Auth)

Temos rotas críticas expostas (`/api/admin/...`). A implementação de **Auth** bloqueará o acesso público a estas rotas.

### Plano para a Próxima Sessão:

1.  **Módulo Users**: Criar entidade e service para Admins.
2.  **Módulo Auth**: Implementar JWT Strategy e Login.
3.  **Guards**: Aplicar `@UseGuards(JwtAuthGuard)` em todos os `AdminController`s já criados.
4.  **Seed**: Criar usuário root inicial.
