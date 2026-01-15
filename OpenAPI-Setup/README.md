# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


```
<!-- Setup for openAPI tanstackQuery heyAPI -->
OpenAPI SDK Setup with Hey API & TanStack Query
Install Required Packages
OpenAPI SDK Generator
npm install @hey-api/openapi-ts

TanStack Query
npm install @tanstack/react-query

Axios client support is provided via @hey-api/client-axios plugin.

Create OpenAPI Configuration
Create a configuration file at the project root.
File: openapi.config.ts

import { defineConfig } from '@hey-api/openapi-ts';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');

export default defineConfig({
  input: `${env.API_BASE_URL}/api/schema/`,
  output: './src/sdk',
  plugins: [
    {
      name: '@hey-api/schemas',
      type: 'json',
    },
    {
      name: '@tanstack/react-query',
      queryOptions: true,
      queryKeys: true,
      mutationOptions: true,
      infiniteQueryOptions: true,
      infiniteQueryKeys: true,
    },
    '@hey-api/client-axios',
  ],
});



Configuration Options
Input
The input option defines the OpenAPI source. Supported values:
URL (remote OpenAPI schema)


Local .json or .yaml file


JavaScript object


API registry reference


Examples
input: 'https://api.example.com/openapi.json'
input: './openapi.yaml'

Output
Defines where the generated SDK will be placed.
Example
output: './src/sdk'

Generated structure
src/
 └── sdk/
     ├── client/
     ├── hooks/
     ├── schemas/
     └── index.ts


Add NPM Script
Add the following script to package.json:
{
  "scripts": {
    "openapi-ts": "openapi-ts -f openapi.config.ts"
  }
}


Generate the SDK
Run the command:
npm run openapi-ts

This will:
Fetch the OpenAPI schema


Generate typed API clients


Generate TanStack Query hooks


Output everything to src/sdk

Configure TanStack Query
Wrap your application with QueryClientProvider.
Example: main.tsx

import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);


Using the Generated SDK
Query Example
import { useGetUsers } from '@/sdk/hooks';

const Users = () => {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

Mutation Example
import { useCreateUserMutation } from '@/sdk/hooks';

const CreateUser = () => {
  const createUser = useCreateUserMutation();

  const handleCreate = () => {
    createUser.mutate({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
  };

  return <button onClick={handleCreate}>Create User</button>;
};


 State Management Strategy
TanStack Query manages all server state:


API caching


Background refetching


Pagination


Optimistic updates


Redux / Zustand / Context can manage client-side UI state if required

```
