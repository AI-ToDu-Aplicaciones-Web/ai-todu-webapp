import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'server', 'db.json');
const distPath = path.join(__dirname, 'dist');

const app = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({
    static: fs.existsSync(distPath) ? distPath : undefined
});

app.use(middlewares);
app.use(jsonServer.bodyParser);

// Health Check Endpoint (Documentado en Capítulo V del Informe)
app.get('/api/v1/health', (_req, res) => {
    res.json({
        status: 'UP',
        service: 'AI-ToDu Unified Azure WebApp & Mock API',
        timestamp: new Date().toISOString()
    });
});

// Reglas de reescritura RESTful para /api/v1/*
app.use(jsonServer.rewriter({
    '/api/v1/authentication/sign-up': '/users',
    '/api/v1/*': '/$1'
}));

app.use(router);

// Fallback para rutas de Vue Router (SPA) en producción (Azure)
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && fs.existsSync(path.join(distPath, 'index.html'))) {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        res.status(404).json({ error: 'Resource not found' });
    }
});

app.listen(port, () => {
    console.log(`AI-ToDu Server & Mock API running on port ${port}`);
});