'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useAdminStore } from '@/store/adminStore';
import ToastContainer from '@/components/admin/Toast';
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Settings, LogOut, Menu, ChevronRight, Bell, Store, AlertTriangle,
} from 'lucide-react';

const NAV = [
  { href: '/admin',            label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products',   label: 'Products',  icon: Package         },
  { href: '/admin/orders',     label: 'Orders',    icon: ShoppingCart    },
  { href: '/admin/customers',  label: 'Customers', icon: Users           },
  { href: '/admin/inventory',  label: 'Inventory', icon: BarChart3       },
  { href: '/admin/settings',   label: 'Settings',  icon: Settings        },
];

function NavItem({
  href, label, icon: Icon, collapsed, active,
}: {
  href: string; label: string; icon: React.ElementType; collapsed: boolean; active: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
        active
          ? 'bg-[#B8963E] text-white shadow-sm'
          : 'text-[#6B6560] hover:bg-[#F5F0E8] hover:text-[#1A1A1A]'
      }`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-[#6B6560] group-hover:text-[#1A1A1A]'}`} />
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, token, loadUser, _hasHydrated } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAdminStore();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // ✅ NEW: wait for full auth check

  useEffect(() => { setMounted(true); }, []);

  const isReady = mounted && _hasHydrated;

  useEffect(() => {
    if (!isReady) return;

    // No token → go to login
    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Token exists but user not loaded yet → fetch user FIRST, then check role
    if (!user) {
      loadUser().then(() => {
        // After loadUser(), the store will update `user`.
        // The next render will re-run this effect with user populated.
        // We do NOT setAuthChecked here — let the next effect run handle it.
      });
      return;
    }

    // User is loaded → check role
    if (user.role !== 'admin') {
      router.replace('/');
      return;
    }

    // ✅ All checks passed — safe to show admin panel
    setAuthChecked(true);
  }, [isReady, token, user]); // ✅ removed router/pathname/loadUser to avoid loops

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // ✅ FIXED: Show spinner until authChecked is true (not just until user is non-null)
  // This prevents the flash-redirect while loadUser() is still fetching from Railway
  if (!isReady || !token || !authChecked) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#B8963E]/30 border-t-[#B8963E] rounded-full animate-spin" />
          <p className="text-[#6B6560] text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); router.push('/'); };

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <>
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#E0D8CC] ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-[#B8963E] rounded-lg flex items-center justify-center flex-shrink-0">
          <Store className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] leading-tight">AL Imran</p>
            <p className="text-xs text-[#6B6560]">Admin Panel</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-semibold text-[#6B6560]/60 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
        )}
        {NAV.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={collapsed}
            active={
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </nav>

      <div className={`border-t border-[#E0D8CC] p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F5F0E8] mb-2">
            <div className="w-8 h-8 rounded-full bg-[#B8963E] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{user?.name}</p>
              <p className="text-xs text-[#6B6560] truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`flex items-center gap-2 text-sm text-[#6B6560] hover:text-red-600 transition px-3 py-2 rounded-lg hover:bg-red-50 w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#FAF7F2] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-white border-r border-[#E0D8CC] transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-[68px]'
        }`}
      >
        <SidebarContent collapsed={!sidebarOpen} />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E0D8CC] flex flex-col lg:hidden">
            <SidebarContent collapsed={false} />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-[#E0D8CC] flex items-center px-4 sm:px-6 gap-4">
          <button
            className="lg:hidden p-2 text-[#6B6560] hover:text-[#1A1A1A] transition rounded-lg hover:bg-[#F5F0E8]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            className="hidden lg:flex p-2 text-[#6B6560] hover:text-[#1A1A1A] transition rounded-lg hover:bg-[#F5F0E8]"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-sm text-[#6B6560]">
            <Link href="/admin" className="hover:text-[#1A1A1A] transition">Admin</Link>
            {pathname !== '/admin' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#1A1A1A] capitalize">
                  {pathname.split('/').filter(Boolean).slice(1).join(' › ')}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/admin/inventory"
              className="p-2 text-[#6B6560] hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
              title="Inventory alerts"
            >
              <AlertTriangle className="w-5 h-5" />
            </Link>
            <button className="relative p-2 text-[#6B6560] hover:text-[#1A1A1A] hover:bg-[#F5F0E8] rounded-lg transition">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#B8963E] flex items-center justify-center ml-1">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}