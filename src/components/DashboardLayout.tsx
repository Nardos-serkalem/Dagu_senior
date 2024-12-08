import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Package,
  Calendar,
  Map,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? 'bg-primary text-white'
          : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {children}
      <ChevronRight className={`ml-auto h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
    </Link>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="h-full px-3 py-4 flex flex-col">
            <div className="flex items-center px-4 py-3 mb-6">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.profileImage || 'https://ui-avatars.com/api/?name=' + user?.name}
                  alt={user?.name}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-1 flex-1">
              <SidebarLink to="/dashboard" icon={Home}>
                Dashboard
              </SidebarLink>
              <SidebarLink to="/dashboard/packages" icon={Package}>
                My Packages
              </SidebarLink>
              <SidebarLink to="/dashboard/bookings" icon={Calendar}>
                My Bookings
              </SidebarLink>
              <SidebarLink to="/dashboard/map" icon={Map}>
                Explore Map
              </SidebarLink>
              <SidebarLink to="/dashboard/chat" icon={MessageSquare}>
                Live Chat
              </SidebarLink>
              <SidebarLink to="/profile" icon={Settings}>
                Settings
              </SidebarLink>
            </nav>

            <div className="pt-4 mt-6 border-t border-gray-200">
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;