import { useState, ReactElement } from 'react';
import {
  Bell,
  Calendar,
  Calculator,
  ChartBar,
  FolderOpen,
  FunnelSimple,
  Gear,
  ListChecks,
  MagnifyingGlass,
  MapPin,
  Receipt,
  Users,
} from '@phosphor-icons/react';

type NavKey =
  | 'Search'
  | 'Notifications'
  | 'Settings'
  | 'Tasks List'
  | 'Pipeline'
  | 'Estimates'
  | 'Invoices'
  | 'Projects'
  | 'Schedule'
  | 'People'
  | 'Map'
  | 'Reports';

type NavItemConfig = {
  key: NavKey;
  label: string;
  icon: ReactElement;
};

const NAV_ITEMS: NavItemConfig[] = [
  { key: 'Search', icon: <MagnifyingGlass size={20} />, label: 'Search' },
  { key: 'Notifications', icon: <Bell size={20} />, label: 'Notifications' },
  { key: 'Settings', icon: <Gear size={20} />, label: 'Settings' },
  {
    key: 'Tasks List',
    icon: <ListChecks size={20} weight='fill' />,
    label: 'Tasks List',
  },
  { key: 'Pipeline', icon: <FunnelSimple size={20} />, label: 'Pipeline' },
  { key: 'Estimates', icon: <Calculator size={20} />, label: 'Estimates' },
  { key: 'Invoices', icon: <Receipt size={20} />, label: 'Invoices' },
  { key: 'Projects', icon: <FolderOpen size={20} />, label: 'Projects' },
  { key: 'Schedule', icon: <Calendar size={20} />, label: 'Schedule' },
  { key: 'People', icon: <Users size={20} />, label: 'People' },
  { key: 'Map', icon: <MapPin size={20} />, label: 'Map' },
  { key: 'Reports', icon: <ChartBar size={20} />, label: 'Reports' },
];

type NavItemProps = Omit<NavItemConfig, 'key'> & {
  navKey: NavKey;
  active: boolean;
  onSelect: (k: NavKey) => void;
};

const NavItem = ({ icon, label, navKey, active, onSelect }: NavItemProps) => (
  <li className='mx-2 my-2 font-questrial'>
    <button
      type='button'
      onClick={() => onSelect(navKey)}
      className={`flex w-full items-center rounded-md px-4 py-1.5 text-[#6a7484] transition-colors hover:bg-slate-600 hover:text-[#6a7484] ${
        active ? 'bg-slate-600 !text-white' : ''
      }`}
    >
      <span className='mr-3'>{icon}</span>
      <span className='text-xs font-medium'>{label}</span>
    </button>
  </li>
);

const Sidebar = () => {
  const [active, setActive] = useState<NavKey>('Tasks List');

  return (
    <nav className='flex h-screen flex-col font-questrial tracking-wide'>
      <ul className='mt-2'>
        {NAV_ITEMS.slice(0, 3).map(({ key, ...rest }) => (
          <NavItem
            key={key}
            navKey={key}
            {...rest}
            active={key === active}
            onSelect={setActive}
          />
        ))}
      </ul>

      <h2 className='mt-6 px-6 text-xs uppercase text-gray-600'>Main Menu</h2>

      <ul className='flex-1 overflow-y-auto'>
        {NAV_ITEMS.slice(3).map(({ key, ...rest }) => (
          <NavItem
            key={key}
            navKey={key}
            {...rest}
            active={key === active}
            onSelect={setActive}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
