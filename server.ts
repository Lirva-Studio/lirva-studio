import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALL_MEMBER_CATEGORIES,
  authenticateMember,
  claimPreviewAccount,
  getAuthStatus,
  revokeBearerToken,
  verifyBearerToken,
  type CategorySlug,
} from './server/auth.ts';
import { MEMBER_TOOLKITS } from './server/memberContent.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  // Public auth status check (never exposes secrets)
  app.get('/api/auth/status', (_req, res) => {
    res.json(getAuthStatus());
  });

  // One-time preview setup/claim endpoint (only active when no env passcode/accounts are configured)
  app.post('/api/auth/setup', (req, res) => {
    const { email, password, name, allowedCategories } = req.body ?? {};
    const result = claimPreviewAccount(email, password, name, allowedCategories);
    if (result.ok === false) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ token: result.token, user: result.user });
  });

  // Unified Member Login across all four categories
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body ?? {};
    const result = authenticateMember(email, password);
    if (result.ok === false) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ token: result.token, user: result.user });
  });

  // Verify current session
  app.get('/api/auth/me', (req, res) => {
    const user = verifyBearerToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ error: 'Hindi naka-login.' });
      return;
    }
    res.json({ user });
  });

  // Logout
  app.post('/api/auth/logout', (req, res) => {
    revokeBearerToken(req.headers.authorization);
    res.json({ ok: true });
  });

  // Protected Member Toolkit route — enforces authentication + per-category access rights
  app.get('/api/member/toolkit/:category', (req, res) => {
    const user = verifyBearerToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ error: 'Kailangan ng Member Login para mabuksan ang full toolkit.' });
      return;
    }

    const slug = req.params.category as CategorySlug;
    if (!ALL_MEMBER_CATEGORIES.includes(slug)) {
      res.status(404).json({ error: 'Hindi mahanap ang kategoryang ito.' });
      return;
    }

    if (!user.allowedCategories.includes(slug)) {
      res.status(403).json({
        error: 'Hindi pa kasama ang kategoryang ito sa kasalukuyang access ng account mo.',
        allowedCategories: user.allowedCategories,
      });
      return;
    }

    res.json({
      toolkit: MEMBER_TOOLKITS[slug],
      user,
    });
  });

  // Block unknown /api routes with JSON 404
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API route not found.' });
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Lirva Studio server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
