import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import ChartCard from "./ChartCard";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F97316",
  "#9333EA",
  "#E11D48",
  "#0891B2",
  "#FACC15",
];

const DomainChart = ({ data }) => {
  return (
    <ChartCard title="Internship Domains">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
             isAnimationActive
             animationDuration={1000}
            data={data || []}
            dataKey="totalInternships"
            nameKey="domainName"
            outerRadius={110}
            label={({ name, percent }) =>
               `${name} (${(percent * 100).toFixed(0)}%)`
             }
          >
            {(data || []).map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default DomainChart;