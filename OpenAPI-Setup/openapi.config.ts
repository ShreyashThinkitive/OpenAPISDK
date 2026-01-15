import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: `https://petstore.swagger.io/v2/swagger.json`,
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
