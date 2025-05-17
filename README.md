# 📝 Laravel + Inertia + React Todo App

A modern Todo application built with **Laravel 12**, **Inertia.js**, **React**, and **ShadCN UI**, featuring:

- ✅ Authentication (Laravel Breeze + Inertia React)
- 📁 Group-based routes
- 📦 Task CRUD with inline editing and completion toggle
- 🔥 Animated UI with Framer Motion & modern components via ShadCN
- 🛎️ Toast notifications with `react-hot-toast`
- 📊 Dashboard stats with task counts

---

## 🚀 Getting Started

### 1. Clone the repository & install dependencies

```bash
git clone https://github.com/berenpolat/todoapp
cd todoapp
composer install
npm install
cp .env.example .env
php artisan key:generate
```

### 2. Migrate database

```bash
php artisan migrate
```

### 3. Start development server

```bash
npm run dev
php artisan serve
```

---

## 🛠️ Features Overview

### Auth & Routing
- Laravel Breeze (Inertia + React)
- Authenticated & guest route separation
- Grouped routes under `/todos`

### UI & UX
- ShadCN UI components (Button, Input, Card, etc.)
- Framer Motion animations
- Toasts via `react-hot-toast`

### Task Management
- Add, edit (inline), delete tasks
- Checkbox to mark complete/incomplete
- Flash messaging for feedback

### Dashboard
- Task statistics: total, completed, pending
- Responsive layout

---

## 📄 License

MIT

---

_Last updated: 2025-05-17_
