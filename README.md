# 📚 BeExample

**BeExample** is a social learning platform that lets university students share daily achievements, insights, and educational progress with their community — in just one tap. It's about celebrating growth, motivating others, and building a shared learning culture.

---

## ✨ Features

- 🧠 **Daily Learning Posts** — Share what you learned, built, or completed each day.
- 💬 **Motivational Prompts** — Encouraging messages for every action you post.
- 🎨 **Modern UI** — Built with TailwindCSS, responsive and animated for an engaging experience.
- 🔐 **Authentication** — Secure login with [Kinde](https://kinde.com/).
- 📊 **Analytics** — Integrated with Umami for privacy-friendly user tracking.
- 🚫 **User Moderation** — Banned users are blocked from using the platform.

---

## 🛠️ Tech Stack

| Layer            | Tech                        |
|------------------|-----------------------------|
| Frontend         | [Next.js](https://nextjs.org/)  |
| UI Components    | TailwindCSS |
| Auth             | [Kinde](https://kinde.com/)       |
| Backend ORM      | [Prisma](https://www.prisma.io/)  |
| Database         | PostgreSQL                   |
| Deployment       | Docker + Caddy + Hetzner     |
| CDN / Proxy      | [Cloudflare](https://www.cloudflare.com/) |
| Analytics        | [Umami](https://umami.is/) (self-hosted) |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mishodzuliashvili/beexample.git
cd beexample
```

### 2. Set up `.env`

Create a `.env` file based on `.env.example` and provide values

### 3. Install dependencies

```bash
pnpm install
```

### 4. Run locally

```bash
pnpm dev
```

---

## 🐳 Docker Deployment

This app is production-ready and can be deployed with Docker.

---

## 🌍 Deployment Notes

- **Hetzner** is used as the hosting provider.
- **Caddy** is configured as a reverse proxy with automatic HTTPS.
- **Cloudflare** handles DNS and CDN-level caching.

<!-- ---

## 📸 Screenshots

> Add some screenshots or a demo link here once available! -->
---

## 🧠 Inspiration

BeExample aims to turn **learning into a shared journey**. Whether you’ve had a breakthrough, completed a course, or learned a new concept, you can celebrate progress and build habits together with others.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.
