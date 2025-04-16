# 🛍️ Teste técnico para Vesti

O projeto simula a experiência real de navegação, filtragem e compra de produtos, com funcionalidades como carrinho persistente, animações suaves e testes automatizados.

---

## 🚀 Tecnologias

- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS V4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

---

## ✨ Funcionalidades

- ✅ Catálogo com filtros por marca, promoção e busca textual
- ✅ Grid de variações (cores e tamanhos) com controle de quantidade
- ✅ Carrinho com:
  - Persistência automática
  - Animações na adição e remoção
  - Total de itens e valor
- ✅ Página de produto com layout responsivo
- ✅ SEO dinâmico (título + imagem da marca/produto)
- ✅ Compartilhamento de produto via Web Share API (fallback para clipboard)
- ✅ Skeleton loading com animações
- ✅ Testes de componentes e store (100% coverage nos testados)

---

## 📝 Observações Relevantes
- Preços nulos: Alguns produtos possuem price: null. Nestes casos, o botão exibido será "Ver detalhes", evitando mostrar preço incompleto.
- Selo de promoção: O campo promotion do backend pode estar inconsistente. Por isso, o selo de "Promoção 🔥" aparece apenas se o componente receber showPromoBadge={true} como nas páginas de filtro promocional.
- SEO dinâmico: O título, descrição e imagem de Open Graph são gerados com base no produto e na marca, tornando o compartilhamento mais relevante.
- Responsividade: O layout se adapta bem a mobile, tablet e desktop.

## 📦 Instalação

```bash
pnpm install
pnpm dev
```