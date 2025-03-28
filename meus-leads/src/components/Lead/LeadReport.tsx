import { CSVLink } from "react-csv";

export default function LeadReport({ leads }) {
  const headers = [
    { label: "Nome", key: "name" },
    { label: "Email", key: "email" },
    { label: "Telefone", key: "phone" },
    { label: "Mensagem", key: "message" },
  ];

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Relatório de Leads</h3>
      <CSVLink
        data={leads}
        headers={headers}
        filename="relatorio_leads.csv"
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Exportar CSV
      </CSVLink>
    </div>
  );
}
