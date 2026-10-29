# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-10-28

### Added
- Unified Presentation Layer (`App.vue`) acting as the global responsive application shell.
- Global i18n support (English/Spanish) togglable via the top app bar.
- `IAM` authentication view handling MYPE user registration and login (US06, US07).
- Real-Time Executive Dashboard view with KPIs for inventory valuation, sales revenue, and stock alerts (US42, US43).
- `Warehouse & Stock` workspace for inventory management and quarantine control (US02, US11, US12, US13, US16).
- `Sales & POS Billing` workspace for commercial transactions and automated stock deduction sync (US03, US26, US27, US30).
- `Logistics & Dispatch` workspace for shipment manifest creation and IoT telemetry tracking (US31, US34, US35, US36).

## [1.9.0] - 2026-10-28

### Added
- `IAM` module implementation for identity and access management (US06, US07).
- `iam.store.js` with session persistence using `localStorage` and role-based owner validation.
- `Logistics` core domain for dispatch and delivery tracking.
- `logistics.store.js` to manage shipment manifests, simulated IoT telemetry (US31, US36), and delivery confirmations (US35).

## [1.8.0] - 2026-10-28

### Added
- `Sales & Billing` core domain implementation (US03, US30).
- `CommercialTransaction` entity with automated tax (IGV) and total calculations.
- Pinia store (`sales.store.js`) to manage transaction state and revenue calculation.
- Domain policy integration: Automatic validation of item status (Quarantine/StockOut) and automatic stock deduction from the `Warehouse` store upon sale creation.

## [1.7.0] - 2026-10-28

### Added
- Core Domain `Warehouse` implementation for inventory management.
- `InventoryItem` aggregate root entity with business rules and stock management (US02, US11).
- `InventoryItemAssembler` for bidirectional DDD mapping between API resources and entities.
- `WarehouseApi` gateway extending `BaseApi`.
- Pinia store (`warehouse.store.js`) for reactive inventory state, quarantine toggles, and total valuation.

## [1.6.0] - 2026-10-28

### Added
- Shared Kernel implementation for cross-context utilities.
- `Money` value object for monetary representation and IGV calculations.
- Centralized Axios error handling with `errorInterceptor`.
- `BaseApi` and `BaseEndpoint` gateway classes to standardize HTTP request routing.

## [1.5.0] - 2026-10-28

### Added
- Unified `AI-ToDu` server using `json-server` for Azure WebApp deployment.
- Health check endpoint (`/api/v1/health`) documented for Chapter V.
- RESTful rewrite rules and SPA fallback for Vue Router production routing.

## [1.4.0] - 2026-10-25

### Added
- Centralized HTTP client configuration (`http-client.js`) using Axios.
- Base connection setup for local Fake API integration on port 3000.
- Immutable `InventoryItem` domain entity for the Inventory context.
- `InventoryService` (Infrastructure) to fetch and map raw JSON data from the Fake API to immutable `InventoryItem` entities.

## [1.3.0] - 2026-10-25

### Added
- Initial inventory data structure (`server/db.json`) for packaging and industrial supplies.
- `mock-api` script in `package.json` to run a local backend mock using `json-server`.

## [1.2.0] - 2026-10-25

### Added
- Integrated the pure HTML landing page structure (`index.html`), global UI styles (`style.css`), and frontend internationalization logic (`main.js`) for the AI-ToDu platform.
- Full readiness for the 1.2.0 release deployment.

## [1.1.1] - 2026-10-08

### Added
- Complete integration of the product catalog and shopping cart in the SPA.
- Persistent top navigation bar through a global layout (`MainLayout`).
- Mocked connection of infrastructure services for the sales and store contexts.

## [1.1.0] - 2026-10-08

### Added
- Shopping cart creation and integration with the Azure MockApi.

## [1.0.1] - 2026-10-08

### Added
- Bounded Context structure for `sales` and `store` following DDD.

### Fixed
- Alignment and color contrast fixes in `LandingView`, `SignInView`, and `SignUpView`.

## [1.0.0] - 2026-10-07

### Added
- Stable production release (`v1.0.0`) of the **Al ToDu** platform.
- Complete integration of the authentication module (IAM) connected to the local server with persistence in `server/db.json`.
- Dynamic language selector with support for `en_US` and `es_419`.
- Architecture based strictly on Clean Architecture and Domain-Driven Design (DDD).

## [0.7.0] - 2026-10-07

### Added
- Integration of JSON translation dictionaries (`en.json` and `es.json`) centralizing static content.
- `LanguageSwitcher` component implemented with `<pv-select-button>` to switch languages globally.

## [0.6.0] - 2026-10-07

### Added
- Integration of `vue-router` for navigation between the Landing Page and the IAM Bounded Context (Login/Register).
- `vue-i18n` configuration supporting `en_US` and `es_419` languages, meeting internationalization criteria.

## [0.5.2] - 2026-10-07

### Fixed
- Migrated HTML mockup from `index.html` to the main component `src/LandingView.vue` to fix the rendering overwrite error (blank screen) caused by the framework mounting.

## [0.5.1] - 2026-10-07

### Fixed
- Character encoding correction in `index.html` by adding `<meta charset="utf-8">`.
- Fixed UI rendering by globally importing PrimeVue, PrimeFlex, and PrimeIcons in `main.js`.

## [0.5.0] - 2026-10-07

### Added
- Bounded Context `task-management`: Core Domain functionality for application task management.
- `Task` Entity and `TaskId` Value Object for in-memory data integrity.
- `task-api.js` connected to the global interceptor and `task.assembler.js` to map HTTP resources to domain entities.
- `taskStore.js` to orchestrate reactivity and task state mutations.
- Presentation components `TaskForm.vue` for creation and `TaskList.vue` based on DataTable for task visualization and updating.

## [0.4.0] - 2026-10-07

### Added
- Bounded Context `shared`: Shared Kernel implementation for cross-cutting code across the application.
- `DateTime` Value Object and static validators in `StringValidator` within the domain layer.
- Centralized Axios configuration in `http-common.js` with an `errorInterceptor` to normalize failed responses in the infrastructure layer.

## [0.3.0] - 2026-10-07

### Added
- Bounded Context `profiles`: User profile management integration.
- `Profile` Entity and `ProfileId` Value Object.
- Infrastructure layer with `profile-api.js` and `profile.assembler.js` for data persistence and instantiation.
- `profileStore.js` to handle the profile state in the application.
- Visual components `ProfileCard.vue` and `ProfileForm.vue` built with PrimeVue.

## [0.2.0] - 2026-10-07

### Added
- Bounded Context `iam`: Identity and Access Management implementation.
- `User` Domain Entity and `UserId` Value Object.
- Infrastructure layer with `iam-api.js` and `user.assembler.js` for backend communication.
- Application store (`iam_store.js`) for reactive authentication state management.
- Vue presentation components (`LoginForm.vue`, `RegisterForm.vue`) and views (`SignInView.vue`, `SignUpView.vue`).

## [0.1.0] - 2026-10-07

### Added
- Benefits section highlighting main features.
- Subscription Plans (Pricing) section with 3 tiers: Basic, Pro, and Teams.
- Public Landing Page consolidation for Al ToDu.

## [0.0.5] - 2026-10-07

### Added
- General SPA architecture in Angular applying Domain-Driven Design (DDD) principles.
- Bounded Contexts creation: `iam`, `warehouse-management`, `reporting`, `security-alerts`, `sensor-integration`, `subscription-management`, and `company-registration`.
- `server/` directory with `server/db.json` and `routes.json` configuration to provide a mocked backend using `json-server`.
- Entity schemas, DTOs, and Assemblers configuration to isolate the UI layer from network infrastructure.
- Internationalization files for English and Spanish in `public/i18n/`.
- GitHub Actions workflows (`azure-static-web-apps.yml`) set up for CI/CD deployment.
- Implementation of the "Benefits" section on the Landing Page to communicate product value using PrimeVue components.

## [Unreleased]

### Added
- **Bounded Context `ai-assistance`**:
  - Domain model implementation: `AiPromptSession` Entity and `SuggestedTask` Value Object with strict immutability.
  - `AiAssistantAssembler` implementation to transform raw data into domain entities.
  - Simulated Application Service `aiAssistantStore` creation for AI orchestration.
  - `AiTaskGenerator.vue` presentation component to interact with task generation (US00X).

## [0.0.1] - 2026-10-06

### Added
- Base structure for the Landing Page project using Vue and Vite.
- Initial environment variables setup and local environment exclusions in `.gitignore`.
- Navigation bar and `Hero Section` implementation applying the Z-pattern layout.
- Integration of global styles and basic CSS variables.