import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import cumulusLogo from '../../assets/cumulus_logo.png';

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => (
  <div className='flex h-screen flex-col'>
    <div className='flex flex-1 overflow-hidden'>
      <aside className='w-40 bg-[#1c2634]'>
        <div className='flex items-center pl-4 pt-10 mb-3'>
          <img src={cumulusLogo} alt='Cumulus logo' className='h-8' />
          <span className='ml-2 text-lg font-bold tracking-wide text-white'>
            Cumulus
          </span>
        </div>
        <Sidebar />
      </aside>

      <main className='flex-1 overflow-auto p-6 pl-0'>{children}</main>
    </div>
  </div>
);

export default Layout;
