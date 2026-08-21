# Contributing to Shadcn Admin

Thank you for your interest in contributing to Shadcn Admin. This guide will help you get started with the contribution process.

## Project Structure

The Shadcn Admin project is organized as follows:

- `/app` - Next.js app router pages and layouts
- `/components` - Shared UI components (shadcn/ui)
- `/contexts` - React context providers
- `/db` - Database schema and migrations
- `/features` - Feature-based modules (auth, dashboard, etc.)
- `/helpers` - Utility functions
- `/hooks` - Custom React hooks
- `/lib` - Core libraries (auth, utils)
- `/public` - Static assets
- `/scripts` - Database seeding scripts

## Development Guidelines

When contributing to Shadcn Admin:

- Keep changes focused. Large PRs are harder to review.
- Ensure all code is type-safe and takes full advantage of TypeScript features.
- Write clear, self-explanatory code. Use comments only when truly necessary.
- Follow the existing code style and conventions.
- Test your changes locally before submitting.

## Getting Started

1. Fork the repository to your GitHub account(Optional)

2. Clone your fork locally:

   ```bash
   git clone https://github.com/itsnyein/shadcn-admin.git
   cd shadcn-admin
   ```

3. Install `pnpm` if you haven't already:

   ```bash
   npm install -g pnpm
   ```

4. Install project dependencies:

   ```bash
   pnpm install
   ```

5. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

   Then update `.env` with your values.

6. Set up the database:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

7. Seed the database:

   ```bash
   pnpm db:seed
   ```

8. Run the development server:

   ```bash
   pnpm dev
   ```

## Code Formatting

We use Prettier and ESLint for code formatting and linting. Before committing, please ensure your code is properly formatted:

```bash
# Format all code
pnpm format

# Check for linting issues
pnpm lint
```

## Development Workflow

1. Create a new branch for your changes:

   ```bash
   git checkout -b type/description
   # Example: git checkout -b feat/user-profile
   ```

   Branch type prefixes:
   - `feat/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation changes
   - `refactor/` - Code refactoring
   - `chore/` - Build process or tooling changes

2. Make your changes following the code style guidelines

3. Ensure the code is properly formatted and linted

4. Commit your changes with a descriptive message:

   ```bash
   feat: add user profile page

   fix: resolve authentication redirect issue
   ```

5. Push your branch to your fork

6. Open a pull request against the `main` branch

## Pull Request Process

1. Create a draft pull request early to facilitate discussion
2. Reference any related issues in your PR description
3. Ensure all checks pass
4. Keep your PR focused on a single feature or bug fix
5. Be responsive to code review feedback

## Code Style

- Follow the existing code style
- Use TypeScript types and interfaces effectively
- Keep functions small and focused
- Use meaningful variable and function names
- Follow the shadcn/ui component patterns
- Prefer composition over inheritance

## Questions?

Open an issue for any questions or suggestions.
