import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

export const renderWithPortal = (ui: ReactElement, options?: RenderOptions) => {
  const portal = document.createElement('div');
  portal.setAttribute('id', 'app-modal');
  document.body.appendChild(portal);

  const cleanup = () => portal.remove();

  return {
    ...render(ui, options),
    cleanup,
  };
};
