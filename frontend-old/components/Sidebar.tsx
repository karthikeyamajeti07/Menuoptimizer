"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Sparkles,
  DollarSign,
  Lightbulb,
  Palette,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Upload Menu",
    href: "/upload",
    icon: Upload,
  },
  {
    name: "Menu Overview",
    href: "/overview",
    icon: FileText,
  },
  {
    name: "AI Descriptions",
    href: "/descriptions",
    icon: Sparkles,
  },
  {
    name: "Pricing Intelligence",
    href: "/pricing",
    icon: DollarSign,
  },
  {
    name: "Menu Strategy",
    href: "/strategy",
    icon: Lightbulb,
  },
  {
    name: "Menu Studio",
    href: "/studio",
    icon: Palette,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-stone-200 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-stone-200 px-6 py-6">
          <Link href="/" className="block">
            <div className="font-serif text-xl font-semibold text-stone-900">
              Menu Optimizer
            </div>
            <div className="mt-1 text-xs text-stone-500">
              Restaurant intelligence
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <div className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-stone-400">
            Workspace
          </div>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-stone-100 font-medium text-stone-900"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-stone-200 p-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
          >
            <Settings size={17} strokeWidth={1.8} />
            <span>Settings</span>
          </Link>

          <div className="mt-3 border-t border-stone-100 px-3 pt-3">
            <div className="text-xs font-medium text-stone-700">
              Bella Italia
            </div>
            <div className="mt-0.5 text-[11px] text-stone-400">
              Restaurant workspace
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}