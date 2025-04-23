import { GitBranch } from '@phosphor-icons/react';
import Layout from './components/Layout/Layout';
import Header from './components/Layout/Header';

const App = () => (
  <Layout>
    <section className='relative h-full w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow'>
      <Header breadcrumbs='Projects / Workflow' />

      <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex h-[300px] w-[300px] items-center justify-center rounded-full border-[10px] border-gray-100 bg-gray-200'>
          <GitBranch size={200} className='rotate-90 text-gray-300' />
        </div>
      </div>
    </section>
  </Layout>
);

export default App;
