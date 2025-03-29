import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", leads: 4000 },
  { name: "Fev", leads: 3000 },
  { name: "Mar", leads: 2000 },
  { name: "Abr", leads: 2780 },
  { name: "Mai", leads: 1890 },
  { name: "Jun", leads: 2390 },
  { name: "Jul", leads: 3490 },
];

const pieData = [
  { name: "Orgânico", value: 400 },
  { name: "Pago", value: 300 },
  { name: "Social", value: 300 },
  { name: "Referência", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Report() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Leads</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Gráfico de Barras */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Leads por Mês</h2>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <BarChart dataKey="leads" />
            </BarChart>
          </div>

          {/* Gráfico de Pizza */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Origem dos Leads</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
