# Gamepod

## Table of Contents

1. Upgrading

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Upgrading Angular

### Styling using Tailwind CSS

`npm install -D tailwindcss postcss autoprefixer`
`npx tailwind init`

`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

Authentication using Firebase Authentication

Configure Firebase Authentication & Firestore

ng add @angular/fire
npm install rxfire@6.0.3

Routing

ng g m Video --routing

<li>
          <a class="px-2" routerLink="/about" routerLinkActive="text-indigo-400"
            >About</a
          >
        </li>

### WebAssembly with Rust

- Why Rust
  Statically-typed.
  Memory safe.

- Install Rust

  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

  ```bash
  source "$HOME/.cargo/env"
  ```

- VSCode Extensions
  rust-analyzer
  Even Better TOML
  Rust

- Initialize Rust project

  ```bash
  cargo init
  ```

- Compile Rust project

  ```bash
  cargo run
  ```

### Deployment to Vercel
