import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

const MonthlyChart = ({ data }) => {
  return (
    <ChartCard title="Monthly Internship Analytics">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data || []}>
          <CartesianGrid
             strokeDasharray="3 3"
             vertical={false}
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
             contentStyle={{
               borderRadius: "12px",
               border: "none",
               boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
             }}
           />

          <Line
            type="monotone"
            dataKey="totalInternships"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default MonthlyChart;