# Prajna World Tech

Prajna World Tech is a modern web application built with [Next.js](https://nextjs.org/), [React 19](https://react.dev/), and styled with [Tailwind CSS 4](https://tailwindcss.com/). It also leverages [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/) for rich, dynamic animations.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18.17 or higher recommended)
- **npm** (recommended as package-lock.json is present), **yarn**, or **pnpm**

## Installation Guide

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/thapaprogress/Prajna_drafty_website.git
   cd prajna-world-tech
   ```

2. **Install dependencies**
   Using npm:
   ```bash
   npm install
   ```

3. **Optimize assets (Optional)**
   This project includes a local script to optimize video frames using Sharp. You can run it if you need to re-optimize visual assets:
   ```bash
   npm run optimize:frames
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Once the server starts, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

To create an optimized production build, run:

```bash
npm run build
```

After the build completes, you can start the production server with:

```bash
npm run start
```

## Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `.next` folder.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run optimize:frames`: Runs the local script (`scripts/optimizeFrames.js`) to optimize frames.
