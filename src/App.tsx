import { useState } from 'react';
import { GitBranch } from '@phosphor-icons/react';
import Layout from '@components/Layout/Layout';
import Header from '@components/Layout/Header';
import { CatalogDialog } from '@components/CatalogDialog';
import type { CatalogConfig } from './types/types.ts';
import { catalogPayload } from '@data/catalog-payload';
import Button from '@components/UI/Button.tsx';

const catalogConfig: CatalogConfig = {
  title: 'Action Types',
  ...catalogPayload,
  actions: {
    add: 'Add',
    cancel: 'Cancel',
    callback: (id) => console.log('Selected item:', id),
  },
  columns: 2,
};

const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Layout>
      <section className='relative h-full w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow'>
        <Header breadcrumbs='Projects / Workflow' />

        <div className='px-6 py-4'>
          <Button
            type='button'
            onClick={() => setDialogOpen(true)}
            className='rounded-md bg-midnight px-4 py-2 text-sm font-medium text-white hover:bg-midnight/90 transition-colors'
          >
            Add Workflow Action
          </Button>
        </div>

        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex h-[300px] w-[300px] items-center justify-center rounded-full border-[10px] border-gray-100 bg-gray-200'>
            <GitBranch size={200} className='rotate-90 text-gray-300' />
          </div>
        </div>

        {dialogOpen && (
          <CatalogDialog
            config={catalogConfig}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </section>
    </Layout>
  );
};

export default App;
