interface CreateLeadButtonProps {
  onClick: () => void;
}

export default function CreateLeadButton({ onClick }: CreateLeadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Criar Lead
    </button>
  );
}
