import { useState } from "react";
import { createTask } from "../../services/taskService";

export default function CreateTaskModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority_score: 1,
    deadline: "",
    status: "todo",
  });

  const handleSubmit = async () => {
    try {
      await createTask(form);
      onCreated(); // reload data
      onClose();   // đóng modal
    } catch (err) {
      console.error(err);
      alert("Tạo task thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white w-[400px] p-6 rounded-lg">

        <h2 className="text-lg font-semibold mb-4">
          Create Task
        </h2>

        <input
          placeholder="Title"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <p>Deadline</p>
        <input
          type="date"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) =>
            setForm({ ...form, deadline: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-gray-900 text-white rounded"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
}