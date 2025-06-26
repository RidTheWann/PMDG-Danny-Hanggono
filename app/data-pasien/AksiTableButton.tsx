import { Edit, Trash2 } from 'lucide-react';

interface AksiTableButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AksiTableButton({ onEdit, onDelete }: AksiTableButtonProps): JSX.Element {
  return (
    <div className="flex gap-2">
      <button
        className="p-1 rounded hover:bg-blue-600 text-blue-400 hover:text-white transition"
        title="Edit"
        onClick={onEdit}
      >
        <Edit className="w-5 h-5" />
      </button>
      <button
        className="p-1 rounded hover:bg-red-600 text-red-400 hover:text-white transition"
        title="Hapus"
        onClick={onDelete}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
