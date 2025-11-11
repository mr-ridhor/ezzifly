"use client";

import {
  User,
  Users,
  Clock,
  CreditCard,
  Settings,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const items = [
    { name: "Personal Details", icon: User },
    { name: "Saved Travellers", icon: Users },
    { name: "Booking History", icon: Clock },
    { name: "Payment Methods", icon: CreditCard },
    { name: "Preferences", icon: Settings },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Shield },
    { name: "Sign Out", icon: LogOut },
  ];

  const active = "Personal Details";

  return (
    <aside className="bg-white dark:bg-slate-900 rounded-lg p-4 mt10 border h-full shadow-sm">
      {/* Profile Header */}


      {/* Navigation Items */}
      <nav className="flex flex-col space-y-1">
        {items.map(({ name, icon: Icon }) => {
          const isActive = name === active;
          return (
            <button
              key={name}
              className={`flex items-center gap-3 text-left py-2 px-3 roundedmd transition-all duration-200 ${
                isActive
                  ? "bg-red-50 border-t-0 border-b-0 border-l-0 border-r border-red-600 text-gray-800 font-medium"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive ? "text-gray-800" : "text-gray-500"
                }`}
              />
              <span className="text-sm">{name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
