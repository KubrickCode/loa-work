# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**CRITICAL**

- Always update CLAUDE.md and README.md When changing a feature that requires major work or essential changes to the content of the document. Ignore minor changes.
- Never create branches or make commits autonomously - always ask the user to do it manually
- ⚠️ MANDATORY SKILL LOADING - BEFORE editing files, READ relevant skills:
  - .ts → typescript
  - .tsx → typescript + react
  - .go → golang
  - .test.ts, .spec.ts → typescript-test + typescript
  - .test.go, \_test.go → go-test + golang
  - .graphql, resolvers, schema → graphql + typescript
  - package.json, go.mod → dependency-management
  - Path-based (add as needed): src/backend/\*\* → nestjs
  - Skills path: .claude/skills/{name}/SKILL.md
  - 📚 REQUIRED: Display loaded skills at response END: `📚 Skills loaded: {skill1}, {skill2}, ...`
- If Claude repeats the same mistake, add an explicit ban to CLAUDE.md (Failure-Driven Documentation)
- Follow project language conventions for ALL generated content (comments, error messages, logs, test descriptions, docs)
  - Check existing codebase to detect project language (Korean/English/etc.)
  - Do NOT mix languages based on conversation language - always follow project convention
  - Example: English project → `describe("User authentication")`, NOT `describe("사용자 인증")`
- Respect workspace tooling conventions
  - Always use workspace's package manager (detect from lock files: pnpm-lock.yaml → pnpm, yarn.lock → yarn, package-lock.json → npm)
  - Prefer just commands when task exists in justfile or adding recurring tasks
  - Direct command execution acceptable for one-off operations
- Dependencies: exact versions only (`package@1.2.3`), forbid `^`, `~`, `latest`, ranges
  - New installs: check latest stable version first, then pin it (e.g., `pnpm add --save-exact package@1.2.3`)
  - CI must use frozen mode (`npm ci`, `pnpm install --frozen-lockfile`)
- Clean up background processes: always kill dev servers, watchers, etc. after use (prevent port conflicts)

**IMPORTANT**

- Avoid unfounded assumptions - verify critical details
  - Don't guess file paths - use Glob/Grep to find them
  - Don't guess API contracts or function signatures - read the actual code
  - Reasonable inference based on patterns is OK
  - When truly uncertain about important decisions, ask the user
- Always gather context before starting work
  - Read related files first (don't work blind)
  - Check existing patterns in codebase
  - Review project conventions (naming, structure, etc.)
- Always assess issue size and scope accurately - avoid over-engineering simple tasks
  - Apply to both implementation and documentation
  - Verbose documentation causes review burden for humans

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
- `common/` - Shared utilities, exception handling, filters
- `content/` - Game content data and calculations
- `item/` - Item pricing (auction/market items)
- `exchange-rate/` - Gold-to-KRW conversion rates
- `user/` - User management and customization
- `monitoring/` - Prometheus metrics endpoint

### Exception Handling (Backend)

Custom GraphQL exceptions in `common/exception/`:

```typescript
// Usage: throw from any resolver
throw new NotFoundException("Content", id);
throw new ForbiddenException("권한이 없습니다.");
throw new UnauthorizedException();
throw new ValidationException("잘못된 입력", "fieldName");
```

Available exception types:

| Exception               | Code               | Usage              |
| ----------------------- | ------------------ | ------------------ |
| `NotFoundException`     | `NOT_FOUND`        | Resource not found |
| `ForbiddenException`    | `FORBIDDEN`        | Access denied      |
| `UnauthorizedException` | `UNAUTHORIZED`     | Auth required      |
| `ValidationException`   | `VALIDATION_ERROR` | Input validation   |

Creating custom exceptions:

```typescript
import { BaseGraphQLException, ERROR_CODES } from "./base.exception";

export class CustomException extends BaseGraphQLException {
  constructor(message: string) {
    super(message, ERROR_CODES.BAD_REQUEST);
  }
}
```

Architecture:

- GraphQL: `formatGraphQLError` handles all GraphQL errors with correlationId
- HTTP: `AllExceptionsFilter` handles REST endpoints (auto-skips GraphQL context)
- All responses include `correlationId` for request tracing via `nestjs-cls`

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

### Release Management

```bash
just release                  # Create automated release via semantic-release
```

The release process is fully automated via semantic-release:

- **Version determination**: Automatically calculated from commit types (feat → minor, fix → patch, BREAKING CHANGE → major)
- **Workflow**: Push to `release` branch triggers GitHub Actions → semantic-release creates tag, GitHub Release, and updates CHANGELOG.md
- **Commit format**: Must follow Conventional Commits (enforced by commitlint)

### Other Commands

```bash
just add-package <svc> <pkg>  # Add package to frontend/backend (e.g., just add-package frontend lodash)
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

### NestJS GraphQL Resolver Method Ordering

In NestJS GraphQL resolvers, organize methods by decorator type (not alphabetically across all methods). Within each decorator group, sort methods alphabetically.

**Order**:

1. `constructor`
2. `@Query` methods (alphabetically)
3. `@Mutation` methods (alphabetically)
4. `@ResolveField` methods (alphabetically)

**Rationale**: GraphQL queries, mutations, and field resolvers are fundamentally different operations. Grouping by decorator type maintains logical cohesion while the decorator itself provides visual separation (no comments needed).

**Example**:

```typescript
@Resolver(() => Content)
export class ContentResolver {
  constructor(private contentService: ContentService) {}

  @Query(() => Content)
  async content(@Args("id") id: number) {
    return await this.contentService.findContentById(id);
  }

  @Query(() => [Content])
  async contentList(@Args("filter") filter?: ContentListFilter) {
    return await this.contentService.findContentList(filter);
  }

  @Mutation(() => ContentCreateResult)
  async contentCreate(@Args("input") input: ContentCreateInput) {
    return await this.contentService.createContent(input);
  }

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() content: Content) {
    return await this.dataLoaderService.contentCategory.findById(content.contentCategoryId);
  }

  @ResolveField(() => String)
  async displayName(@Parent() content: Content) {
    return `${content.name}${content.gate ? ` ${content.gate}관문` : ""}`;
  }
}
```
