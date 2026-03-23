export default function TaskDetailModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-3">
          {task.title}
        </h2>

        <p className="text-gray-600 mb-3">
          {task.description}
        </p>

        <p>Status: {task.status}</p>
        <p>Priority: {task.priority_score}</p>
        <p>
          Deadline: {task.deadline?.slice(0, 10)}
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-gray-900 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}