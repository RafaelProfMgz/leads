import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LeadStats({ leads }) {
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map((status) => ({
    name: status,
    count: statusCounts[status],
  }));

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Estatísticas de Leads</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
