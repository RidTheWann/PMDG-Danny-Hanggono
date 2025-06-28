import Link from 'next/link';
import { Home, PlusCircle, Users, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    label: 'Beranda',
    icon: <Home className="w-6 h-6" />,
  },
  {
    href: '/tambah-pasien',
    label: 'Data Harian',
    icon: <PlusCircle className="w-6 h-6" />,
  },
  {
    href: '/data-pasien',
    label: 'Dashboard',
    icon: <Users className="w-6 h-6" />,
  },
  {
    href: '/laporan',
    label: 'Arship Tugas',
    icon: <FileText className="w-6 h-6" />,
  },
];

export default function BottomNav(): JSX.Element {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 border-t border-gray-200 shadow-2xl bg-white/90 dark:bg-gray-900/90 dark:border-gray-700 md:hidden bottom-nav-blur">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-xs font-medium transition-all duration-200 px-2 py-1 rounded-lg group ${
              isActive
                ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 scale-110 shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100/60 dark:hover:bg-blue-800/60'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={`transition-transform duration-200 ${
                isActive ? 'scale-125' : 'group-hover:scale-110'
              }`}
            >
              {item.icon}
            </span>
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
