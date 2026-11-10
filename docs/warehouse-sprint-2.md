# Warehouse Sprint 2

The inventory module follows the supplied Learning Center frontend guide: immutable domain models with private fields; `shallowRef` snapshots in the Pinia application store; Axios/BaseApi/BaseEndpoint and assemblers in Infrastructure; routed views in Presentation.

## Run

```text
npm ci
npm run dev
```

Start the ASP.NET Core Warehouse API on port 5080 first. Open `http://localhost:5173/inventory.html`. In development Vite proxies `/warehouse-api` to the real API's `/api/v1`. The warehouse CTA in the existing landing also opens this entry.

For a separately hosted production API, set `VITE_WAREHOUSE_API_URL=https://YOUR_API_HOST/api/v1` before `npm run build`. This URL is configuration, not a secret. Configure the API's CORS origins for the frontend domain. Both `index.html` (existing landing) and `inventory.html` are included in the production build.

## Structure

```text
src/warehouse/
  domain/model/
    inventory-item.entity.js
    stock-lot.entity.js
    sku.value-object.js
  application/warehouse.store.js
  infrastructure/
    warehouse-api.js
    inventory-item.assembler.js
  presentation/
    warehouse-app.vue
    warehouse-routes.js
    warehouse.css
    locales/{en,es}.json
    views/{inventory-list,inventory-item-form,inventory-detail}.vue
```

The UI reads model snapshots and sends intentions to the API. It does not directly PUT an edited balance. Business rules and transactions are enforced in the backend. An uncertain command retains its operation ID during the current session, allowing safe replay of that payload. After a conflict, reload and review the operation. The server persists idempotency records across browser sessions.

## Identity handoff

Register through `inventory.html#/sign-up`, then sign in through `#/sign-in`. The implemented IAM API issues the JWT stored only in `sessionStorage` under `aitodu_token`. Restoring a session requires `/authentication/me`; a local user object cannot grant access. The API's `/warehouse/session` returns inventory permissions. The client never sends an organization/actor as request authority. The old demonstration identity is no longer accepted.

Owners can register organization users and enable/disable them through `#/users`. Operators manage inventory; sales clerks have a read-only inventory view. Sign-out clears the session and inventory snapshots. Expired or disabled sessions return to sign-in. Each new owner starts a separate organization, so older demonstration inventory does not appear under their new account.

## Production build

```text
npm run build
```

Test scripts and their CI step have been removed at the user's request. Inventory operations are unchanged; the shell and routes now integrate IAM. Product IDs come from the backend as integers.

## Integration with the rest of the project

The inventory entry is separate from the old unmounted `src/app.vue`. That legacy file and its Sales/Logistics flow are not used to demonstrate this module. Its direct client-side stock-adjustment approach must be replaced by the server-side Sales/warehouse integration contract before reconnecting it. The new store intentionally has no `adjustStock(item,delta)` or `toggleQuarantine(item)` browser-side balance mutation methods.

The Shared BaseApi constructor now accepts optional per-context base URL/error handling while preserving existing callers' defaults. Warehouse retains structured ProblemDetails errors for localized feedback.
