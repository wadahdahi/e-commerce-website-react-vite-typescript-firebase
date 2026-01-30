import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface EleganceRadarChartProps {
  data: any[];
}

const EleganceRadarChart = ({ data }: EleganceRadarChartProps) => {
  return (
    <div className="w-full h-80 bg-white dark:bg-dark-15 p-6 rounded-2xl border-2 border-dashed border-dark-15 transition-all hover:bg-white/80 dark:hover:bg-dark-20">
      <h3 className="text-dark-10 dark:text-white font-bold font-mono mb-4">
        Elegance Evaluation (by Segment)
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#b39a8233" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#888", fontSize: 10, fontFamily: "monospace" }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />

          <Radar
            name="Women"
            dataKey="Women"
            stroke="#8B4513"
            fill="#8B4513"
            fillOpacity={0.4}
          />
          <Radar
            name="Men"
            dataKey="Men"
            stroke="#4A3728"
            fill="#4A3728"
            fillOpacity={0.4}
          />
          <Radar
            name="Kids"
            dataKey="Kids"
            stroke="#D2B48C"
            fill="#D2B48C"
            fillOpacity={0.4}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "10px" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EleganceRadarChart;
