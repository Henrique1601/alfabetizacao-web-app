# 🏛️ Histórico de Decisões — AlfabetizaçãoCraft

Registro das decisões arquiteturais e escolhas técnicas do projeto (ADRs).

---

## [ADR-001] Inicialização do Segundo Cérebro Persistente
- **Status:** Aceito
- **Data:** 2026-11-09
- **Contexto:** Garantir conformidade com a governança do ecossistema e manter persistência e contexto zero-amnésia entre sessões multi-máquina.
- **Decisão:** Criação da estrutura perene `docs/brain/` com suporte a wikilinks Obsidian (`INDEX.md`, `DECISIONS.md`, `GOTCHAS.md`).

## [ADR-002] Governança Global Master Agent (Double-Gate)
- **Status:** Aceito
- **Data:** 2026-11-09
- **Contexto:** Necessidade de sincronização contínua multi-PC e portão seguro de entrada/saída.
- **Decisão:** Toda sessão inicia com Portão 0 (fetch/pull silencioso do GitHub via `git-master-agent`) e fecha com Portão Final (testes, verificação de segredos e commit semântico).

## [ADR-003] Sistema de Efeitos Sonoros Procedurais (Web Audio API)
- **Status:** Aceito
- **Data:** 2026-11-09
- **Contexto:** Necessidade de feedback tátil e auditivo instantâneo sem depender de arquivos `.mp3`/`.wav` externos lentos ou bloqueados por CORS.
- **Decisão:** Implementação de osciladores sintetizados proceduralmente em `src/utils/sfx.ts` (Click, Erro e Acorde Maior de Vitória).

## [ADR-004] Gamificação & Progresso Persistente (RPG / Crafting)
- **Status:** Aceito
- **Data:** 2026-11-09
- **Contexto:** Aumentar retenção e engajamento da criança através de feedback lúdico de evolução.
- **Decisão:** Implementação de barra de XP, níveis incrementais (LVL) e coleta de Esmeraldas persistidas no `localStorage`.
