import { useTasks } from "../hooks/useTasks";
import { updateTask, deleteTask } from "../services/taskService";
import { useState } from "react";
import CreateTaskModal from "../components/task/CreateTaskModal";
import TaskDetailModal from "../components/task/TaskDetailModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const cols = ["todo", "doing", "done"];

export default function Tasks() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { tasks, fetchTasks } = useTasks();
  // 🔥 GROUP TASKS
  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    doing: tasks.filter((t) => t.status === "doing"),
    done: tasks.filter((t) => t.status === "done"),
  };

  // 🔥 DRAG HANDLE
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const id = result.draggableId;
    const newStatus = result.destination.droppableId;

    await updateTask(id, { status: newStatus });
    fetchTasks();
  };

  // 🔥 VIEW DETAIL
  const handleView = (task) => {
    setSelectedTask(task);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold">Tasks</p>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {cols.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white border rounded-lg p-3 min-h-[300px]"
                >
                  <h3 className="font-semibold text-gray-900 mb-3 capitalize">
                    {col}
                  </h3>

                  {grouped[col].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border-l-4 p-3 mb-3 rounded-md cursor-grab active:cursor-grabbing
                            ${
                              task.status === "todo"
                                ? "border-gray-400 bg-gray-50"
                                : task.status === "doing"
                                  ? "border-yellow-400 bg-yellow-50"
                                  : "border-green-500 bg-green-50"
                            }`}
                        >
                          <p className="font-medium text-gray-900">
                            {task.title}
                          </p>

                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>

                          <div className="flex justify-between text-xs mt-2">
                            <span className="text-gray-500">
                              {task.priority_score}
                            </span>
                            <span className="text-gray-500">
                              {task.deadline?.slice(0, 10)}
                            </span>
                          </div>

                          {/* ACTIONS */}
                          <div className="flex justify-between mt-3 text-sm">
                            <button
                              onClick={() => handleView(task)}
                              className="text-blue-500"
                            >
                              View
                            </button>

                            {/* Dynamic button */}
                            {task.status === "todo" && (
                              <button
                                onClick={() =>
                                  updateTask(task.id, {
                                    ...task,
                                    status: "doing",
                                  }).then(fetchTasks)
                                }
                                className="text-yellow-500"
                              >
                                Start
                              </button>
                            )}

                            {task.status === "doing" && (
                              <button
                                onClick={() =>
                                  updateTask(task.id, {
                                    ...task,
                                    status: "done",
                                  }).then(fetchTasks)
                                }
                                className="text-green-500"
                              >
                                Done
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(task.id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* MODAL CREATE */}
      {openModal && (
        <CreateTaskModal
          onClose={() => setOpenModal(false)}
          onCreated={fetchTasks}
        />
      )}

      {/* MODAL DETAIL */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
