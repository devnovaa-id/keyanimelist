'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Compass, 
  Tv,
  CheckCircle,
  Search,
  Menu
} from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/ongoing', icon: Tv, label: 'Ongoing' },
    { href: '/complete', icon: CheckCircle, label: 'Complete' },
    { href: '/genre', icon: Compass, label: 'Genre' },
    { href: '/search', icon: Search, label: 'Search' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-20 ${
                isActive ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}