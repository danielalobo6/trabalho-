# EmpregaJá — Landing Page de Vagas de Emprego

Landing page desenvolvida como atividade acadêmica, cobrindo:

- **Estrutura HTML** semântica (header, hero, seções, tabela, formulário, footer)
- **Estilização CSS** com um sistema de cores/tipografia consistente
- **Responsividade** (menu hambúrguer, grid adaptável, tabela com rolagem em telas pequenas)
- **Tabela de vagas** com dados de cargo, empresa, cidade, salário e modalidade
- **Formulário de candidatura** (cadastro de currículo)
- **JavaScript** para:
  - Validação do formulário (nome, e-mail, telefone, campos obrigatórios e checkbox de termos)
  - Navegação por hiperlink (menu mobile + destaque do link ativo ao rolar a página)
  - Busca por área de atuação, filtrando a tabela de vagas em tempo real

## Estrutura do projeto

```
empregaja/
├── index.html        # Estrutura da página
├── css/
│   └── style.css      # Estilização e responsividade
├── js/
│   └── script.js       # Validação, navegação e busca
└── README.md
```

## Como executar

Basta abrir o arquivo `index.html` em qualquer navegador — não há dependências
de build. Também é possível servir a pasta com qualquer servidor estático,
por exemplo:

```bash
npx serve .
```

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Landing page EmpregaJá - vagas de emprego"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/empregaja.git
git push -u origin main
```

Para publicar como página web funcional gratuitamente, ative o **GitHub
Pages** em *Settings → Pages → Branch: main → / (root)*. O link ficará
disponível em `https://SEU-USUARIO.github.io/empregaja/`.

## Paleta de cores

| Cor | Hex | Uso |
|---|---|---|
| Azul | `#2563EB` | Ações primárias, confiança |
| Verde | `#22C55E` | Sucesso, vagas remotas |
| Branco | `#FFFFFF` | Fundo, limpeza visual |
| Grafite | `#1F2937` | Textos e seções escuras |
