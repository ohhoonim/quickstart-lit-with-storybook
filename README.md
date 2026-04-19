# Biz-UI Component Library

## Project Overview

This project is a UI component library named "Biz-UI" built using Lit and TypeScript. It is designed for building user interfaces with reusable
web components. The library leverages modern web development tools and practices, including:

*   Lit: For creating efficient, lightweight web components.
*   TypeScript: For static typing and improved code maintainability.
*   Vite: As the build tool and development server, providing fast hot module replacement and optimized builds.
*   Storybook: For developing, documenting, and testing components in isolation.
*   Vitest: A fast unit test framework, integrated with Playwright for browser-based testing, and supporting Storybook story testing.

## Building and Running

The project provides several npm scripts for development, building, and testing:

*   Build Project:
    ```bash
    npm run build
    ```
    Compiles the TypeScript code and bundles the components using Vite for production deployment.

*   Run Storybook:
    ```bash
    npm run storybook
    ```
    Launches the Storybook development server, allowing you to explore and interact with components.

*   Build Storybook:
    ```bash
    npm run build-storybook
    ```
    Generates a static build of the Storybook documentation.

*   Run Tests:
    The project is configured for Vitest. While not explicitly listed in `package.json` scripts, the conventional command to run tests is:
    ```bash
    npm vitest
    ```
    This will execute unit and browser-based tests, including those leveraging Storybook stories.
* Run Link:
    ```bash
    npm link
    ```

## Development Conventions

### Component Structure

Each UI component is organized into its own dedicated directory within `src/components/`. A typical component directory contains:

*   `ComponentName.ts`: The main TypeScript file for the component's logic and template.
*   `ComponentName.css`: The CSS file for styling the component.
*   `ComponentName.stories.ts`: Storybook files for demonstrating component usage and states.
*   `ComponentName.test.ts` (implied): While not explicitly read, the directory structure suggests dedicated test files.
*   `index.ts`: An export file to re-export the component and its types, facilitating easy imports.

### Lit Component Patterns

*   Components are defined as functions returning Lit's `html` template literals.
*   Props are defined using TypeScript interfaces (e.g., `BreadcrumbProps`).
*   Event handlers are passed as props and bound within the templates.

### Styling

*   CSS is co-located with components.
*   CSS class names often follow a `biz-component-name` or `component-name` pattern.

### Testing and Documentation

*   Storybook: All components have corresponding Storybook stories (`.stories.ts`) that serve as living documentation and are used for interactive
    development.
*   Vitest: Unit and integration tests are configured using Vitest, with browser testing capabilities enabled via Playwright and integrated with
    Storybook stories.
*   Accessibility: Storybook is configured with accessibility add-ons (` @storybook/addon-a11y`) to encourage accessible component development.

### TypeScript Configuration

The `tsconfig.json` file indicates a modern TypeScript setup targeting ES2023, with `bundler` module resolution and strict linting rules
(`noUnusedLocals`, `noUnusedParameters`).

## Key Files

*   `package.json`: Defines project metadata, dependencies, and scripts.
*   `tsconfig.json`: Configures the TypeScript compiler.
*   `vite.config.ts` (implied, often present with Vite): Configuration for the Vite build tool.
*   `.storybook/main.ts`: Storybook configuration file, defining story locations and add-ons.
*   `.storybook/preview.ts`: Storybook preview file, setting global parameters and decorators.
*   `vitest.config.ts`: Vitest configuration, including browser testing setup.
*   `src/index.ts`: Main entry point for exporting all components.
*   `src/components/ComponentName/index.ts`: Exports for individual components.
*   `index.html`: The main HTML file used for local development and preview.