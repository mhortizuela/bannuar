import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import MainLayout from './Layouts/MainLayout';

const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];

    // Get the component
    const PageComponent = page.default;

    // Apply layout only if defined
    PageComponent.layout = PageComponent.layout || ((page) => page);

    return PageComponent;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
});