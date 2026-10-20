# CI e critérios de qualidade

O workflow de CI é dividido em verificações independentes para que cada falha apareça separadamente na Pull Request. Todos os jobs usam Node.js 22, compatível com o requisito do Vite 7 (Node.js 22.12 ou superior).

- **TypeScript:** executa `npm run typecheck`.
- **Application smoke tests:** verifica invariantes básicas da interface com o test runner nativo do Node.js.
- **Production build:** confirma que o Vite gera o bundle de produção.
- **Production dependency audit:** executa `npm audit --omit=dev` para dependências de produção.

## Limitações atuais e próximos passos

Os smoke tests são verificações de regressão leves baseadas no código-fonte; não renderizam componentes, simulam interações nem substituem testes de navegador. A evolução recomendada é:

1. Adicionar ESLint com configuração compatível com React e TypeScript.
2. Introduzir Vitest e React Testing Library para testes unitários e de componentes.
3. Introduzir Playwright para fluxos E2E no navegador.
4. Configurar regras de proteção da branch `main` para exigir os checks do CI.

Não marque os itens futuros como concluídos até que as dependências, os testes reais e a execução no CI estejam validados.
