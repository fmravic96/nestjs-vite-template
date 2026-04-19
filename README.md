# NestJS + Vite Turborepo Starter

This is a community-maintained example combining NestJS backend with Vite frontend in a Turborepo monorepo.

## Using this example

Run the following command:

```bash
npx create-turbo@latest -e with-nestjs
```

Then replace Next.js with Vite:

```bash
cd apps/web
rm -rf .next next.config.js pages
# Add your Vite setup here
```

## What's inside?

This Turborepo includes the following packages & apps:

### Apps and Packages

```shell
.
├── apps
│   ├── backend                       # NestJS API server (port 8000)
│   └── frontend                      # Vite frontend (port 3000)
└── packages
    ├── @repo/backend                 # Shared NestJS types and DTOs
    ├── @repo/eslint-config           # ESLint configurations
    ├── @repo/jest-config             # Jest test configurations
    ├── @repo/typescript-config       # TypeScript configurations
    └── @repo/ui                      # Shareable React component library
```

### Key Features

- **NestJS Backend**: REST API server with TypeScript
- **Vite Frontend**: Modern frontend tooling with HMR
- **Monorepo Structure**: Shared code and dependencies
- **Type Safety**: End-to-end TypeScript support
- **Development Ports**:
  - Frontend: `http://localhost:3000`
  - Backend: `http://localhost:8000`

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Turborepo CLI

### Installation

```bash
pnpm install
```

### Development

Run both frontend and backend in development mode:

```bash
pnpm run dev
```

This will:
- Start NestJS backend on port 8000
- Start Vite frontend on port 3000
- Watch for changes in both apps

### Build

Build all apps and packages:

```bash
pnpm run build
```

### Testing

Run tests:

```bash
pnpm run test
```

Run e2e tests:

```bash
pnpm run test:e2e
```

## Configuration

### Vite Proxy Setup

To avoid CORS issues, configure proxy in `apps/frontend/vite.config.ts`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### NestJS CORS

Configure CORS in `apps/backend/src/main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

## Project Structure

```
├── apps/
│   ├── backend/          # NestJS application
│   │   ├── src/          # Source code
│   │   └── ...           # NestJS specific files
│   └── frontend/         # Vite application
│       ├── src/          # Frontend source
│       └── vite.config.ts
├── packages/
│   ├── backend/          # Shared backend types
│   ├── eslint-config/    # ESLint config
│   ├── jest-config/      # Jest config
│   └── typescript-config/ # TS config
└── package.json          # Root package.json
```

## Available Commands

| Command       | Description                          |
|--------------|--------------------------------------|
| `pnpm dev`    | Start both apps in dev mode          |
| `pnpm build`  | Build all apps and packages          |
| `pnpm test`   | Run all tests                        |
| `pnpm lint`   | Run ESLint on all packages           |
| `pnpm format` | Format code with Prettier            |

## Remote Caching

Turborepo supports remote caching with Vercel:

```bash
npx turbo login
npx turbo link
```

## Troubleshooting

### Module Resolution Issues

If you get "Cannot find module '@repo/backend'" errors:

1. Ensure `packages/backend` is built: `cd packages/backend && pnpm build`
2. Check `apps/backend/tsconfig.json` has proper path mappings
3. Verify `@repo/backend` is listed in `apps/backend/package.json` dependencies

### Port Conflicts

If ports 3000 or 8000 are occupied:

1. Change Vite port in `apps/frontend/vite.config.ts`
2. Change NestJS port in `apps/backend/src/main.ts`
3. Update CORS configuration accordingly

## Migration from Next.js to Vite

This template was originally based on the `with-nestjs` Turborepo example but has been modified to use Vite instead of Next.js for the frontend.

## License

MIT