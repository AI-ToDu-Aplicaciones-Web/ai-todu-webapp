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

app.get('/api/v1/health', (_req, res) => {
    res.json({
        status: 'UP',
        version: '2.0.0',
        platform: 'Microsoft Azure App Service (Linux Node 22-lts)',
        boundedContexts: ['iam', 'warehouse', 'sales', 'logistics']
    });
});

app.use(jsonServer.rewriter({
    '/api/v1/*': '/$1'
}));

app.use(router);

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && fs.existsSync(path.join(distPath, 'index.html'))) {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        res.status(404).json({ status: 404, message: 'Endpoint or resource not found' });
    }
});

app.listen(port, () => {
    console.log(`[AI-ToDu v2.0.0] Unified WebApp & Mock API running on port ${port}`);
});