# 🛍️ Technical Test for Vesti

This project simulates a real-world e-commerce experience, including product browsing, filtering, and purchasing. It features a persistent cart, smooth animations, and automated tests.

---

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

---

## ✨ Features

- ✅ Product catalog with brand filters, promotions, and text search
- ✅ Variants grid (colors and sizes) with quantity control
- ✅ Shopping cart with:
  - Automatic persistence
  - Add/remove animations
  - Item count and total price
- ✅ Product page with responsive layout
- ✅ Dynamic SEO (title and brand/product image)
- ✅ Product sharing via Web Share API (clipboard fallback)
- ✅ Skeleton loading with animations
- ✅ Component and store tests (100% coverage for tested units)

---

## 📝 Important Notes

- **Null prices**: Some products have `price: null`. In these cases, the button displays **“View details”** to avoid showing incomplete pricing.
- **Promotion badge**: The backend `promotion` field may be inconsistent. Therefore, the **“Promotion 🔥”** badge is only shown when the component receives `showPromoBadge={true}`, as used on promotional filter pages.

---

## 📦 Installation

```bash
pnpm install
pnpm dev
