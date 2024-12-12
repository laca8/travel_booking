import React, { useState } from "react";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Home,
  Settings,
  Users,
  Box,
  BarChart,
  Mail,
} from "lucide-react";
import Header from "../features/Header";
import horse from "../../assets/img/icon.jpg";

const Sidebar = ({
  isExpanded = true,
  onToggle = () => {},
  className = "",
}) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState(["analytics"]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart,
      submenu: [
        { id: "reports", label: "Reports" },
        { id: "metrics", label: "Metrics" },
        { id: "forecasts", label: "Forecasts" },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      submenu: [
        { id: "team", label: "Team" },
        { id: "clients", label: "Clients" },
      ],
    },
    {
      id: "messages",
      label: "Messages",
      icon: Mail,
      badge: "4",
    },
    {
      id: "products",
      label: "Products",
      icon: Box,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const MenuIcon = ({ icon: Icon, className = "" }) => (
    <Icon className={`w-7 h-7 ${className}`} />
  );

  const MenuItem = ({ item, level = 0 }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = activeItem === item.id;

    return (
      <>
        <button
          onClick={() => {
            if (hasSubmenu) {
              toggleSubmenu(item.id);
            }
            setActiveItem(item.id);
          }}
          className={`
            w-full flex items-center gap-2 px-3 py-2 rounded-lg
            ${
              isActive
                ? "bg-blue-50 text-blue-600 dark:bg-blue-150 dark:text-blue-400"
                : "hover:bg-gray-100 "
            }
            ${level > 0 ? "ml-6 text-sm" : "font-medium"}
            transition-colors duration-150
          `}>
          {item.icon && <MenuIcon icon={item.icon} />}
          <span className="flex-1 text-left text-black font-bold">
            {item.label}
          </span>

          {isExpanded && (
            <>
              {item.badge && (
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  {item.badge}
                </span>
              )}
              {hasSubmenu && (
                <MenuIcon
                  icon={isExpanded ? ChevronDown : ChevronRight}
                  className="w-4 h-4"
                />
              )}
            </>
          )}
        </button>
        {hasSubmenu && isExpanded && expandedMenus.includes(item.id) && (
          <div className="mt-1">
            {item.submenu.map((subItem) => (
              <MenuItem key={subItem.id} item={subItem} level={level + 1} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`
      flex flex-col h-screen text-[var(--dark-color)] bg-[var(--primary-color)]
      border-r border-gray-200 dark:border-gray-100
      ${isExpanded ? "w-64" : "w-16"}
      transition-all duration-300
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={onToggle}
          className="p-2 ml-auto rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        {/* {isExpanded && (
          <span className="text-xl font-semibold">
            <img src={horse} alt="logo" className="w-36 h-10 rounded-xl" />
          </span>
        )} */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>
    </div>
  );
};

// Example usage
const Demo = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      <div className="flex h-screen  bg-gray-100">
        <Sidebar
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Main Content</h1>
        </div>
      </div>
    </>
  );
};

export default Demo;
