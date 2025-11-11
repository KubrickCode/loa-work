# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**CRITICAL**

- Always update CLAUDE.md and README.md When changing a feature that requires major work or essential changes to the content of the document. Ignore minor changes.

## Project Overview

로직장 (LOA Work) is a Lost Ark game content analysis platform that provides insights on the real-world value of in-game labor. The project calculates hourly wages based on gold exchange rates, content duration, and reward data.

## Architecture

This is a monorepo containing:

- **Frontend**: TypeScript/React application with GraphQL client, Chakra UI v3, and Vite
- **Backend**: NestJS GraphQL API with PostgreSQL and Prisma ORM
- **Data Collection Services**: Go-based scrapers for Lost Ark API data
- **Infrastructure**: AWS deployment with Docker containers

### Backend Architecture

The backend uses NestJS with a modular structure:

- **GraphQL API**: Code-first approach with `@nestjs/graphql` and Apollo Server
- **Authentication**: Passport-based auth supporting Google, Discord, and Kakao OAuth providers
- **Database**: PostgreSQL accessed via Prisma ORM with session store
- **Modules**: Organized by domain (auth, content, item, user, exchange-rate, discord, monitoring)
- **Console Commands**: CLI commands for database seeding via `nestjs-console`

Key modules:

- `auth/` - OAuth authentication with multiple providers
- `content/` - Game content data and calculations
- `item/` - Item pricing (auction/market items)
- `exchange-rate/` - Gold-to-KRW conversion rates
- `user/` - User management and customization
- `monitoring/` - Prometheus metrics endpoint

### Frontend Architecture

The frontend uses React with a component-based structure:

- **Routing**: React Router v7 with centralized route configuration in `src/core/app/router/routes.tsx`
- **State Management**: Apollo Client for GraphQL state, React Context for local state
- **UI Framework**: Chakra UI v3 with custom theme and components
- **Pages**: Content wage list (home), content reward list, item price list, admin panel
- **Core Components**: Reusable components in `src/core/` (dialog, table, form, navigation, etc.)

Component organization:

- `core/` - Reusable UI components and utilities
- `pages/` - Page-level components with their own context
- Each major feature uses context providers for state management

### Database Schema

Key entities in the Prisma schema:

- **Content System**: `Content`, `ContentCategory`, `ContentDuration`, `ContentReward` - game content and rewards
- **Market Data**: `MarketItem`, `MarketItemStat` - trading post items with price history
- **Auction Data**: `AuctionItem`, `AuctionItemStat` - auction house items with bid history
- **User System**: `User`, `UserContentDuration`, `UserContentReward`, `UserItem` - user customization
- **Exchange Rates**: `GoldExchangeRate`, `UserGoldExchangeRate` - currency conversion

The schema uses cascading deletes and indexes on frequently queried fields like `[marketItemId, createdAt]`.

## Key Development Commands

All commands use `just` (justfile) as the task runner:

### Dependencies

```bash
just deps                    # Install all dependencies
just deps-frontend          # Install frontend dependencies only
just deps-backend           # Install backend dependencies only
```

### Development Servers

```bash
just run frontend           # Start React dev server (port 3000)
just run backend            # Start NestJS dev server (port 3001)
just run <go-service>       # Start Go service with air hot reload
```

Available Go services: `auction-item-stat-scraper`, `market-item-category-scraper`, `market-item-scraper`, `market-item-stat-scraper`

### Database Operations

```bash
just prisma migrate dev     # Run database migrations
just makemigration <name>   # Create new migration
just migrate               # Alias for migrate dev
just migrate-prod          # Deploy migrations to production
just prisma <args>          # Run any Prisma command
just reset                  # Reset database (dangerous!)
just pgadmin               # Start pgAdmin container (admin@example.com/admin)
just setup-testdb           # Set up test database
just sync-go-schema         # Generate Go database models with SQLBoiler
```

Notes:

- When connecting to PostgreSQL via pgAdmin, use `host.docker.internal` as the hostname
- Database seeding is configured in `backend/package.json` and runs via `nestjs-console`

### Testing

```bash
just test backend          # Run backend unit tests
just test backend <args>   # Run specific backend tests (e.g., --testNamePattern)
just test-e2e             # Run backend e2e tests
just go-test              # Run all Go tests
```

The test database is automatically created and migrated before tests run. Tests use `--runInBand` for sequential execution.

### Code Quality

```bash
just lint                 # Lint all code (frontend + backend)
just lint frontend        # Lint frontend only
just lint backend         # Lint and format backend (Prettier + ESLint)
```

### Code Generation

```bash
just codegen              # Generate TypeScript types from GraphQL schema
just mockgen              # Generate Go mocks using mockgen
```

### Other Commands

```bash
just add-package <svc> <pkg>  # Add package to frontend/backend (e.g., just add-package frontend lodash)
just release <version>        # Create release (patch/minor/major)
```

## Project Structure

```
src/
├── backend/
│   ├── src/
│   │   ├── auth/           # OAuth authentication
│   │   ├── common/         # Shared utilities
│   │   ├── console/        # CLI commands for seeding
│   │   ├── content/        # Game content logic
│   │   ├── dataloader/     # DataLoader for GraphQL N+1 optimization
│   │   ├── discord/        # Discord webhook integration
│   │   ├── exchange-rate/  # Currency conversion
│   │   ├── item/           # Item pricing
│   │   ├── monitoring/     # Prometheus metrics
│   │   ├── prisma/         # Prisma service
│   │   └── user/           # User management
│   └── prisma/
│       └── schema.prisma   # Database schema
├── frontend/
│   └── src/
│       ├── core/           # Reusable components
│       │   ├── app/        # App setup, router
│       │   ├── auth/       # Auth-related components
│       │   ├── graphql/    # Apollo client, generated types
│       │   ├── form/       # Form components
│       │   ├── layout/     # Layout components
│       │   ├── navigation/ # Navigation components
│       │   ├── table/      # Table components
│       │   └── theme/      # Chakra UI theme
│       ├── pages/          # Page components
│       │   ├── admin/              # Admin panel
│       │   ├── content-reward-list/ # Content reward listing
│       │   ├── content-wage-list/   # Home page (content wages)
│       │   └── item-price-list/     # Item price listing
│       └── shared/         # Shared utilities
└── go/
    ├── apps/               # Scraper microservices
    └── libs/               # Shared Go libraries
        ├── env/            # Environment variables
        ├── http-client/    # HTTP utilities
        ├── loa-api/        # Lost Ark API client
        ├── loa-db/         # Database access with SQLBoiler
        ├── monitoring/     # Prometheus metrics
        └── schedule/       # Cron scheduling
```

## Environment Setup

Environment variables are managed through Doppler. A `.doppler.env` file (not in git) should contain:

```bash
DOPPLER_TOKEN_ROOT=<token>
DOPPLER_TOKEN_VITE=<token>
```

Then run:

```bash
just generate-env         # Download secrets from Doppler to .env files
```

## Go Workspace

Go services use workspace mode (`go.work`) with 4 scraper apps and 6 shared libraries. The workspace enables local development with shared dependencies.

Scraper apps:

- `auction-item-stat-scraper` - Tracks auction house price statistics
- `market-item-category-scraper` - Discovers market item categories
- `market-item-scraper` - Collects market item data
- `market-item-stat-scraper` - Tracks market price statistics

Shared libraries:

- `env` - Environment variable management
- `http-client` - HTTP utilities
- `loa-api` - Lost Ark API client
- `loa-db` - Database access with SQLBoiler
- `monitoring` - Prometheus metrics
- `schedule` - Cron scheduling

## Coding Style & Guidelines

- Whenever possible, prioritize code readability over code efficiency.
- In React code, props are always sorted in ascending alphabetical order, and object properties are also sorted that way if possible.
- Always write code that's short and concise. Make good use of early return techniques, and be careful not to create too much depth in conditional statements or loops.
- For object-type properties (e.g. React props) or types or interfaces, always sort in alphabetical order whenever possible.
- Always keep variable and property names concise but clear.
- Always maintain a clear separation of concerns. However, be careful not to over-segregate, such as through premature optimization.
- You should always write your code in a way that makes it easy to unit test.
- Comments shouldn't be used unless absolutely necessary. Write readable code that can be understood without comments, and only include comments for unavoidable business logic.
- Variable values should be separated into constants whenever possible. Avoid creating magic numbers.
