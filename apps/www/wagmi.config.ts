import { defineConfig } from '@wagmi/cli';
import { foundry, react } from '@wagmi/cli/plugins';

export type MaybeArray<T> = T | T[];
export type MaybePromise<T> = T | Promise<T>;

const config = defineConfig({
  out: './src/lib/wagmi/generated.ts',
  contracts: [],
  plugins: [
    foundry({
      project: '../../packages/contracts',
    }),
    react(),
  ],
});

export default config;
