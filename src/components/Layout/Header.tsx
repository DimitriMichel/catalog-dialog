import { CaretDown, Bell, UserCircle } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

type HeaderProps = {
  breadcrumbs: ReactNode;
};

const Header = ({ breadcrumbs }: HeaderProps) => (
  <header className='flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 font-questrial'>
    <nav
      className='flex items-center space-x-2 text-sm text-gray-400'
      aria-label='Breadcrumb'
    >
      {breadcrumbs}
    </nav>

    <div className='flex items-center'>
      <button
        type='button'
        aria-label='Notifications'
        className='p-1.5 rounded-full hover:bg-gray-100 transition'
      >
        <Bell size={20} className='text-gray-600' />
      </button>

      <button
        type='button'
        aria-label='Account menu'
        className='flex items-center px-1.5 py-1 rounded-full hover:bg-gray-100 transition'
      >
        <UserCircle size={20} className='text-gray-600' />
        <span className='mx-2 text-xs text-gray-600'>J. Polk</span>
        <CaretDown size={16} className='text-gray-500' />
      </button>
    </div>
  </header>
);

export default Header;
