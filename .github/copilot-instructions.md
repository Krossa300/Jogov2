# Copilot Instructions for Jogov2

## Project Overview
This is an Nx monorepo containing a full-stack application with:
- **Express backend** (`apps/express`) - TypeScript Node.js server with TypeORM database integration
- **React frontend** (`apps/react_front`) - Vite-powered React app with Tailwind CSS
- **Shared packages** (`packages/`) - Common interfaces and TypeORM configuration

## Architecture & Data Flow

### Package Structure
- `packages/shared-interfaces` - TypeScript interfaces implementing base patterns (IIdentificavel, IAtributoBase, etc.)
- `packages/typeorm` - Database layer with entities, repositories, services, and connection management
- Applications import shared packages using `@jogov2/package-name` syntax

### Database Layer Pattern
Follow the established 3-layer TypeORM architecture:
1. **Entities** (`packages/typeorm/src/lib/entities/`) - All entities extend `BaseEntity` which provides `id`, `codigo`, `createdAt`, `deletedAt`
2. **Repositories** (`packages/typeorm/src/lib/repositories/`) - Extend `BaseRepository<T>` for common CRUD operations
3. **Services** (`packages/typeorm/src/lib/services/`) - Business logic layer that uses repositories

### Entity Pattern Example
```typescript
@Entity('table_name')
export class MyEntity extends BaseEntity implements IMyInterface {
  @Column({ type: 'varchar', length: 100, nullable: false })
  nome!: string;
}
```

## Development Workflows

### Key Commands
- `npx nx build <project>` - Build specific project
- `npx nx serve express` - Start Express server (port 3333)
- `npx nx serve react_front` - Start React dev server (port 4200)
- `npx nx test <project>` - Run tests for specific project
- `npx nx graph` - Visualize project dependencies
- `npx nx sync` - Update TypeScript project references

### Testing Setup
- Jest for Node.js packages and Express backend
- Vitest for React frontend with React Testing Library
- Test files use `*.spec.ts` or `*.test.ts` conventions

### Database Integration
- Express app initializes database connection in `main.ts` using `initializeDatabase(postgresConfig)`
- Must register entities in config: `entities: [EntityClass]`
- Services instantiated after database initialization
- Connection managed via singleton pattern in `DatabaseConnection.getInstance()`

## Project-Specific Conventions

### Import Paths
- Use relative imports with `.js` extension for internal package files
- Shared packages imported as `@jogov2/package-name`
- TypeScript compiled to `.js` but source uses `.ts`

### File Organization
- All business logic in `packages/typeorm/src/lib/`
- Entities implement corresponding interfaces from `shared-interfaces`
- Repository and service files follow naming: `entity-name.repository.ts`, `entity-name.service.ts`

### Configuration Files
- Each app/package has own `eslint.config.mjs`, `jest.config.ts`, `tsconfig.json`
- Root `nx.json` defines build targets and plugins (Webpack for Express, Vite for React)
- TypeScript project references automatically managed by Nx

## Critical Integration Points
- Express server imports and initializes TypeORM entities/services
- React frontend will consume Express API endpoints
- Shared interfaces ensure type safety across frontend/backend boundary
- All projects participate in Nx dependency graph for incremental builds