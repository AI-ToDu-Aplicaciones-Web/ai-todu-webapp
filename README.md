# AI-ToDu Web Application

Vue 3, JavaScript and PrimeVue frontend connected to the C# AI-ToDu Platform. The existing landing and application are separate entries in the same Vite build.

## Run locally

Start MySQL 8 and the backend on port 5080 using the backend README. Then:

```powershell
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

- Website: `http://127.0.0.1:5173/`
- Create organization: `http://127.0.0.1:5173/inventory.html#/sign-up`
- Sign in: `http://127.0.0.1:5173/inventory.html#/sign-in`
- Inventory: `http://127.0.0.1:5173/inventory.html#/inventory`
- Organization users (owner only): `http://127.0.0.1:5173/inventory.html#/users`

Create your organization and owner account, then sign in. Passwords require at least 12 characters and at most 72 UTF-8 bytes. Owners can register warehouse operators and sales clerks in their own organization. Operators manage inventory; sales clerks can consult it. Accounts can be enabled/disabled by their owner. Disabled accounts cannot sign in or use existing tokens.

The application validates sessions against the server, stores the access token in session storage and clears account-specific inventory state on sign-out. Refreshing the page restores a valid session. Credentials are sent only in POST bodies; they are not queried through the old mock `/users` service or stored as browser user objects.

English is the default; use **ES** for Spanish. Each newly registered organization has its own inventory. Records entered using the former development identity remain in the old demonstration organization.

## Build and hosting

```powershell
npm run build
```

`npm start` builds and serves static files. Configure a separate platform URL or route same-origin `/api/v1` requests to ASP.NET at the hosting edge. Use `npm run mock` only for legacy demonstrations.

Both `index.html` and `inventory.html` are built. In development, Vite proxies `/warehouse-api` to `http://127.0.0.1:5080/api/v1`. For a separate production API set `VITE_WAREHOUSE_API_URL=https://YOUR_API_HOST/api/v1` before building and configure that frontend origin in the API's CORS settings.

IAM follows `src/iam/{domain/model,application,infrastructure,presentation}`. Inventory details and integration boundaries are documented in [Warehouse Sprint 2](docs/warehouse-sprint-2.md). Sales supports a multi-product cart, payment outcomes, dated history, receipts and classified returns. Open Organization to view stock alerts; owners can select the subscription, manage adjustment reasons and review recent activity. Open Users to grant or revoke staff permissions.
