import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../../types";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch task
  const fetchTask = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: `${import.meta.env.VITE_APP_URL}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setTask(data);
      } else {
        console.error("Task not found");
      }
    } catch (err) {
      console.error("Error fetching task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  // Update status
  const updateStatus = async (status: Task["status"]) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: `${import.meta.env.VITE_APP_URL}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setTask(updated);
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete task
  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: `${import.meta.env.VITE_APP_URL}`,
          },
        }
      );

      if (res.ok) {
        alert("Task deleted");
        navigate("/");
      } else {
        alert("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!task) return <p className="p-6">Task not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold">Description: </span>
        {task.description || "No description"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Status: </span>
        <span
          className={`${
            task.status === "completed"
              ? "text-green-400"
              : task.status === "in-progress"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {task.status}
        </span>
      </p>
      <p className="mb-6">
        <span className="font-semibold">Due: </span>
        {new Date(task.duedatetime).toLocaleString()}
      </p>

      {/* Status select */}
      <div className="flex flex-col gap-3 pt-6 mb-6">
        <span className="font-semibold">Update Status:</span>
        <select
          value={task.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateStatus(e.target.value as Task["status"])
          }
          className="border border-gray-600 bg-gray-800 text-gray-100 rounded p-2 w-full"
          name="status"
          id="status"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <br />
      {/* Delete button */}
      <button
        onClick={deleteTask}
        className="px-4 py-2 mt-5 rounded bg-gray-700 hover:bg-gray-600 transition"
      >
        Delete Task
      </button>
    </div>
  );
}
