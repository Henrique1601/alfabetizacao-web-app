# ⚠️ Gotchas & Armadilhas Conhecidas — AlfabetizaçãoCraft

Registro de pontos de atenção, restrições técnicas e soluções para problemas frequentes no projeto.

---

## 🔊 Síntese de Voz (Web Speech API)
- **Problema:** Em alguns navegadores móveis ou ambientes restritos, o `window.speechSynthesis` requer interação direta do usuário (touch/click) antes de reproduzir áudio.
- **Mitigação:** Certificar que gatilhos de voz e leitura de palavras/sílabas estejam amarrados a eventos diretos do usuário.

## ⚡ Next.js App Router & Regras de Agentes
- **Atenção:** Respeitar o arquivo [AGENTS.md](file:///c:/Users/henri/Programacao/Projetos/AlfabetizacaoCraft/alfabetizacao-web-app/AGENTS.md) gerado pelo Next.js com as regras específicas da versão atual do framework.
