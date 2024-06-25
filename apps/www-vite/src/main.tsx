import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.gen';
import './styles/global.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We know the root element exists
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
