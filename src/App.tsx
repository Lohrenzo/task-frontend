import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TaskDetails from "./pages/TaskDetails";
import NotFound from "./pages/NotFound";
import type { Task } from "../types";
import Nav from "./components/Nav";

function App() {
  const [openAdd, setOpenAdd] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/tasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: `${import.meta.env.VITE_APP_URL}`,
          },
        }
      );

      if (!response.ok) return;

      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="flex flex-col justify-start text-gray-100">
      <Nav setOpenAdd={setOpenAdd} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index tasks={tasks} />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Modal */}
      {openAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newTask = {
                  title: formData.get("title"),
                  description: formData.get("description"),
                  status: formData.get("status"),
                  dueDateTime: formData.get("duedatetime"),
                };

                try {
                  const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/tasks`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(newTask),
                    }
                  );

                  if (res.ok) {
                    alert("Task added successfully!");
                    setOpenAdd(false);
                    fetchTasks();
                  } else {
                    alert("Failed to add task.");
                  }
                } catch (err) {
                  console.error("Error adding task:", err);
                }
              }}
              className="flex flex-col gap-4"
            >
              {/* Title */}
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-sm font-medium mb-1 text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm font-medium mb-1 text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label
                  htmlFor="status"
                  className="text-sm font-medium mb-1 text-gray-300"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Due DateTime */}
              <div className="flex flex-col">
                <label
                  htmlFor="duedatetime"
                  className="text-sm font-medium mb-1 text-gray-300"
                >
                  Due Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="duedatetime"
                  name="duedatetime"
                  required
                  className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenAdd(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
