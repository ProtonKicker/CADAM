import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ErrorView } from './views/ErrorView.tsx';
import { PromptView } from './views/PromptView.tsx';
import { Layout } from './components/Layout.tsx';
import EditorView from './views/EditorView.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <PromptView />,
            errorElement: <ErrorView />,
          },
          {
            path: '/editor/:id',
            element: <EditorView />,
            errorElement: <ErrorView />,
          },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>,
);
