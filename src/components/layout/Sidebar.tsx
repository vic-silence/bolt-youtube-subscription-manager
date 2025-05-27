import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Layers, Tv2, Settings } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { state } = useAppContext();
  
  const navItems = [
    { 
      to: '/', 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      to: '/themes', 
      label: 'Themes', 
      icon: <Layers size={20} />,
      count: state.themes.length 
    },
    { 
      to: '/channels', 
      label: 'Channels', 
      icon: <Tv2 size={20} />,
      count: state.channels.length 
    },
    { 
      to: '/settings', 
      label: 'Settings', 
      icon: <Settings size={20} /> 
    }
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-20 pt-16 ${
        isOpen ? 'w-64' : 'w-0 -translate-x-full sm:translate-x-0 sm:w-16'
      }`}
    >
      <nav className="mt-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${!isOpen && 'justify-center sm:flex'}
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && (
                  <span className="ml-3 flex-grow">{item.label}</span>
                )}
                {isOpen && item.count !== undefined && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {item.count}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {isOpen && state.lastUpdated && (
        <div className="absolute bottom-4 left-0 right-0 px-4 text-xs text-gray-500">
          <p>Last updated:</p>
          <p className="font-medium">{new Date(state.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;