import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesActivityChartProps {
  data: any[];
}

const SalesActivityChart = ({ data }: SalesActivityChartProps) => {
  return (
    <div className="w-full h-80 bg-white dark:bg-dark-15 p-6 rounded-2xl border-2 border-dashed border-dark-15 transition-all hover:bg-white/80 dark:hover:bg-dark-20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-dark-10 dark:text-white font-bold font-mono">
          Market Performance
        </h3>
        <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-1 rounded-full font-mono">
          LIVE DATA
        </span>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B4513" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8B4513" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB11"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#8B4513"
            fillOpacity={1}
            fill="url(#colorSales)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesActivityChart;
