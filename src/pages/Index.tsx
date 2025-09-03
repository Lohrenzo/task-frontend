import type { Task } from "../../types";

interface Props {
  tasks: Task[];
}

export default function Index({ tasks }: Props) {
  return (
    <main className="p-4 text-gray-100 relative">
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="p-3 min-w-full border md:text-base sm:text-sm text-sm border-gray-700 bg-gray-800">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-t border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    <a href={`/tasks/${task.id}`}>{task.title}</a>
                  </td>
                  <td className="px-4 py-3 sm:w-[45%] text-gray-400">
                    {task.description ? <span>{task.description}</span> : "-"}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      task.status === "completed"
                        ? "text-green-400"
                        : task.status === "in-progress"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {new Date(task.duedatetime).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-400 italic"
                >
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
