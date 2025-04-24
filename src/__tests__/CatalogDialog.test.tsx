import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CatalogDialog } from '@components/CatalogDialog';
import { renderWithPortal } from './testUtils';
import { catalogFactory } from './factories/catalogFactory';

describe('CatalogDialog', () => {
  const mountDialog = (cfg = catalogFactory()) =>
    renderWithPortal(<CatalogDialog config={cfg} onClose={() => void 0} />);

  afterEach(() => document.getElementById('app-modal')?.remove());

  it('closes on Escape', async () => {
    const onCloseMock = vi.fn();
    renderWithPortal(
      <CatalogDialog
        config={{
          title: 'Add Workflow',
          prompt: 'Pick something cool',
          categories: [
            { id: 'cat-docs', name: 'Docs' },
            { id: 'cat-empty', name: 'Empty' },
          ],
          items: [
            {
              id: 'item-1',
              name: 'Blinker Fluid',
              description: 'Add Blinker Fluid',
              tags: [],
              category: 'cat-item-1',
            },
          ],
          tags: [],
          actions: {
            add: 'Add',
            cancel: 'Cancel',
            callback: vi.fn(),
          },
        }}
        onClose={onCloseMock}
      />
    );

    expect(document.querySelector('.fixed.inset-0.z-50')).not.toBeNull();

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('double-clicking “Blinker Fluid” confirms immediately', async () => {
    const user = userEvent.setup();
    const config = catalogFactory();
    mountDialog(config);

    const itemBtn = screen.getByRole('button', { name: /blinker fluid/i });
    await user.dblClick(itemBtn);

    await waitFor(() =>
      expect(config.actions.callback).toHaveBeenCalledWith('item-1')
    );
  });

  it('each ItemCard shows its title and description', () => {
    mountDialog();

    const card = screen.getByTestId('item-card-item-1');
    const utils = within(card);

    expect(utils.getByText(/^blinker fluid$/i)).toBeInTheDocument();
    expect(utils.getByText(/add blinker fluid/i)).toBeInTheDocument();
  });

  it('search filters items by name / description / tag', async () => {
    const user = userEvent.setup();
    mountDialog();

    const input = screen.getByPlaceholderText('Search');

    await user.type(input, 'fluid');
    expect(
      screen.getByRole('button', { name: /blinker fluid/i })
    ).toBeVisible();

    await user.clear(input);
    await user.type(input, 'nonsense');

    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /blinker fluid/i })
      ).toBeNull()
    );
  });
});
