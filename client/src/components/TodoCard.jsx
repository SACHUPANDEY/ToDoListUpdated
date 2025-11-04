export default function TodoCard({ todo, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded-xl mb-3">
      <div>
        <p className="text-gray-800 font-medium">{todo.todo}</p>
        <p className="text-xs text-gray-500">
          {todo.userName ? `By: ${todo.userName}` : ""}
        </p>
      </div>

      <div className="flex gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(todo._id)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
