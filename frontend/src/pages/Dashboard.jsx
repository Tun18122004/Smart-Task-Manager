import { useDashboard } from "../hooks/useDashboard";
import Stat from "../components/Stat";

export default function Dashboard() {
  const {
    total,
    doing,
    done,
    overdue,
    upcoming,
    progress,
  } = useDashboard();

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your tasks
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        <Stat title="Total Tasks" value={total} />
        <Stat title="In Progress" value={doing} />
        <Stat title="Completed" value={done} />
        <Stat title="Overdue" value={overdue} danger />
      </div>

      {/* PROGRESS */}
      <div className="bg-white border rounded-lg p-5">
        <p className="font-semibold mb-3">
          Progress
        </p>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-[#4ECDC4] h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {progress}% completed
        </p>
      </div>

      {/* UPCOMING */}
      <div className="bg-white border rounded-lg p-5">
        <p className="font-semibold text-gray-900 mb-4">
          Upcoming Deadlines
        </p>

        {upcoming.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No upcoming tasks 🎉
          </p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-900">
                  {t.title}
                </span>

                <span className="text-sm text-gray-500">
                  {t.deadline?.slice(0, 10)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}