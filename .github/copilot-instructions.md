# Copilot Instructions for napata

## Project Overview
- This is an Angular project with a modular structure: main components are under `src/app/components`, shared services/components under `src/app/shared`, and core strategies in `src/app/core`.
- The app uses Angular's standalone component architecture (no NgModules), with routing defined in `src/app/app.routes.ts` and configured via `src/app/app.config.ts`.
- The main entry point is `src/app/app.component.ts`, which wraps header, router outlet, and footer in a scrollable container.

## Architecture & Patterns
- Components are grouped by feature in subfolders (e.g., `main/components/hero`, `main/components/quote`).
- Shared services (e.g., `parallax.ts`) use Angular signals for reactive state and are injected via `providedIn: 'root'`.
- Routing uses `withInMemoryScrolling` for anchor scrolling and scroll restoration, but custom scroll logic may be needed for scrollable containers.
- SCSS is organized by feature/component, with global variables in `src/styles/_variables.scss` and global styles in `src/styles/styles.scss`.

## Developer Workflows
- Build and serve: Use `ng serve` for local development.
- Test: Use `ng test` (see npm scripts in `package.json`).
- Components are generated with Angular CLI (`ng g c path/to/component`).
- For debugging scroll/anchor issues, check custom scroll logic in `app.component.ts`.

## Project Conventions
- Font families and colors are managed via SCSS variables.
- Use `routerLink` and `fragment` for navigation to sections; for scrollable containers, implement manual scroll logic.
- Use signals for reactive state in services.
- Use semantic HTML and accessibility best practices (header, main, section, footer).

## Integration Points
- No external API integrations found; all data flows are local and component/service-based.
- Images and assets are under `src/assets`.

## Examples
- Parallax service: `src/app/shared/services/parallax.ts` demonstrates signal-based scroll offset tracking.
- Routing: `src/app/app.routes.ts` and `src/app/app.config.ts` show route and scroll config.
- Footer separator: SVG rectangles used for visual separation in `src/app/shared/components/footer/footer.html`.

## Key Files
- `src/app/app.component.ts` (main layout, scroll logic)
- `src/app/app.routes.ts` (routing)
- `src/app/app.config.ts` (router config)
- `src/styles/_variables.scss` (global SCSS variables)
- `src/app/shared/services/parallax.ts` (parallax logic)

---

If any section is unclear or missing, please specify what needs improvement or additional detail.