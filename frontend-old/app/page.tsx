import { ArrowUpRight, TrendingUp, PieChart, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-10 space-y-8 max-w-6xl">
      <header>
        <h2 className="text-3xl font-serif text-[#1A1A1A]">Welcome back, Bella Italia</h2>
        <p className="text-stone-500">Here is your menu performance overview and optimization health.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Dishes", val: "24", icon: ShoppingBag, color: "text-blue-600" },
          { label: "Avg. Gross Margin", val: "42.5%", icon: PieChart, color: "text-green-600" },
          { label: "AI Optimized Items", val: "18", icon: ArrowUpRight, color: "text-orange-600" },
          { label: "Revenue Opportunity", val: "₹12.4k", icon: TrendingUp, color: "text-emerald-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 border border-stone-200 shadow-sm rounded-none">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-3xl font-serif">{stat.val}</p>
            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 border border-stone-200 h-64 flex flex-col justify-center items-center text-stone-400">
          <p className="text-sm italic font-serif">Category Margin Distribution Chart Placeholder</p>
        </div>
        <div className="bg-white p-6 border border-stone-200 h-64 flex flex-col justify-center items-center text-stone-400">
          <p className="text-sm italic font-serif">Price Elasticity Heatmap Placeholder</p>
        </div>
      </div>
    </div>
  );
}