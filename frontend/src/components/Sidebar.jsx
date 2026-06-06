import React from 'react';
import { 
  Users, 
  BookOpen 
} from 'lucide-react';

export default function Sidebar({ activeItem = 'Customers', onItemClick }) {
  const primaryNavItems = [
    { name: 'Customers', icon: Users }
  ];

  const footerNavItems = [
    { name: 'Documentation', icon: BookOpen },
  ];

  const handleNavClick = (itemName) => {
    if (onItemClick) {
      onItemClick(itemName);
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            ChurnGuard
            <span>Customer Success AI</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => handleNavClick(item.name)}
                type="button"
              >
                <Icon aria-hidden="true" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        {footerNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
              onClick={() => handleNavClick(item.name)}
              type="button"
            >
              <Icon aria-hidden="true" />
              {item.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
