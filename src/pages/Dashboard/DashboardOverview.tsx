import { ICONS } from "@/constants/icons";
import { useAnalytics } from "@/hooks/useAnalytics";
import EleganceRadarChart from "@/components/dashboard/Overview/EleganceRadarChart";
import SalesActivityChart from "@/components/dashboard/Overview/SalesActivityChart";
import { StatCard } from "@/components/dashboard/Overview/StatCard";

export default function DashboardOverview() {
  const {
    totalProducts,
    totalValueRaw,
    categoriesCount,
    radarData,
    salesData,
    totalVisits,
    totalUsers,
  } = useAnalytics();

  return (
    <div className="flex flex-col gap-4 sm:gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1 sm:gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold font-roboto tracking-tight text-dark-12 dark:text-white border-l-4 border-brown-80 pl-4">
            Dashboard Overview
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-mono font-medium ml-5">
          Detailed statistics and site activity from live data.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Visits"
          value={totalVisits}
          icon={ICONS.NAV.HOME}
          trend="+100%"
        />
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={ICONS.NAV.ACCOUNT}
          trend="+5%"
        />
        <StatCard
          label="Total Products"
          value={totalProducts}
          icon={ICONS.NAV.PRODUCTS}
          trend="+12%"
        />
        <StatCard
          label="Inventory Value"
          value={totalValueRaw}
          icon={ICONS.NAV.CART}
          trend="+18%"
          isCurrency
        />
      </div>

      {/* MAIN CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesActivityChart data={salesData} />
        <EleganceRadarChart data={radarData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {/* RECENT SYSTEM UPDATES */}
        <div className="bg-white dark:bg-dark-15 p-4 sm:p-6 rounded-2xl border-2 border-dashed border-dark-15 shadow-sm dark:shadow-none flex flex-col gap-4">
          <h3 className="text-dark-10 dark:text-white text-sm sm:text-base font-bold font-mono border-b-2 border-dashed border-dark-15 pb-4">
            Recent System Updates
          </h3>
          <div className="flex flex-col gap-4">
            {[
              {
                user: "Admin",
                action: "Updated 'Summer Dress' price",
                time: "2 mins ago",
              },
              {
                user: "System",
                action: "Daily backup completed",
                time: "1 hour ago",
              },
              {
                user: "Admin",
                action: "Added new collection 'Bags'",
                time: "3 hours ago",
              },
              {
                user: "System",
                action: "Security scan performed",
                time: "5 hours ago",
              },
            ].map((update, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b-2 border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-col">
                  <span className="text-dark-10 dark:text-white text-xs font-bold font-mono">
                    {update.action}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-[10px] font-mono">
                    By {update.user}
                  </span>
                </div>
                <span className="text-gray-400 text-[10px] font-mono">
                  {update.time}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-auto w-full py-2 border-2 border-dashed border-dark-15 rounded-xl text-xs text-gray-400 hover:bg-primary-bg dark:hover:bg-white/5 transition-all cursor-pointer">
            View All Activity
          </button>
        </div>

        {/* ANALYTICS NOTE */}
        <div className="bg-brown-80/40 dark:bg-brown-60/5 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-brown-60/20 flex flex-col justify-center items-center text-center gap-4">
          <div className="p-3 sm:p-4 rounded-full bg-brown-80/20 text-brown-60 dark:text-brown-60">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
              <img
                src={ICONS.NAV.OVERVIEW}
                className="w-6 h-6 sm:w-8 sm:h-8 grayscale brightness-0 contrast-200"
                alt="insight"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-base sm:text-lg font-bold text-dark-10 dark:text-brown-60 font-mono">
              Analytics Insight
            </h4>
            <p className="text-xs sm:text-sm text-dark-12/70 dark:text-gray-400 max-w-xs font-mono">
              Your store's elegance score is performing above average this week.
              Focus on "Materials" to improve luxury perception.
            </p>
          </div>
          <button className="px-5 py-2 bg-brown-60 text-white rounded-full text-[10px] sm:text-xs font-bold hover:bg-brown-80 transition-all active:scale-95 cursor-pointer">
            Optimize Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
