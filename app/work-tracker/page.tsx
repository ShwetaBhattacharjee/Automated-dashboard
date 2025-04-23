"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

// Type for work item
type WorkItem = {
  _id?: string;
  unit: string;
  task: string;
  assignedTo: string;
  status: string;
  lastUpdated: string;
  deadline: string;
  workStart: string;
  memberUpdate: string;
};

export default function WorkTracker() {
  const [data, setData] = useState<WorkItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(10);

  const [form, setForm] = useState<WorkItem>({
    unit: "",
    task: "",
    assignedTo: "",
    status: "To Do",
    lastUpdated: new Date().toISOString(),
    deadline: "",
    workStart: "",
    memberUpdate: "",
  });

  const fetchData = async () => {
    const res = await axios.get("/api/tracker");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form._id) {
      await axios.put(`/api/tracker/${form._id}`, form);
    } else {
      await axios.post("/api/tracker", form);
    }
    setForm({
      unit: "",
      task: "",
      assignedTo: "",
      status: "To Do",
      lastUpdated: new Date().toISOString(),
      deadline: "",
      workStart: "",
      memberUpdate: "",
    });
    fetchData();
  };

  const handleEdit = (item: WorkItem) => {
    setForm(item);
  };

  const handleDelete = async (id?: string) => {
    if (id) {
      await axios.delete(`/api/tracker/${id}`);
      fetchData();
    }
  };

  const filteredData = data.filter((item) =>
    [
      item.unit,
      item.task,
      item.assignedTo,
      item.status,
      item.deadline,
      item.workStart,
      item.memberUpdate,
      new Date(item.lastUpdated).toLocaleString(),
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-6 min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          📋 Work Tracker
        </h1>

        <input
          type="text"
          placeholder="Search by unit, task, assignee, status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded bg-gray-800 text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredData.slice(0, visibleCount).map((item) => (
            <div
              key={item._id}
              className="bg-[#1f1f1f] p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <p>
                <strong>Unit:</strong> {item.unit}
              </p>
              <p>
                <strong>Task:</strong> {item.task}
              </p>
              <p>
                <strong>Assigned To:</strong> {item.assignedTo}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>
                <strong>Deadline:</strong> {item.deadline}
              </p>
              <p>
                <strong>Work Start:</strong> {item.workStart}
              </p>
              <p>
                <strong>Member Update:</strong> {item.memberUpdate}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(item.lastUpdated).toLocaleString()}
              </p>
              <div className="flex justify-end gap-2">
                <button onClick={() => handleEdit(item)}>
                  <Pencil className="text-yellow-400" />
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredData.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Add / Edit Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="unit"
              placeholder="Unit"
              value={form.unit}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            />
            <input
              type="text"
              name="task"
              placeholder="Task"
              value={form.task}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            />
            <input
              type="text"
              name="assignedTo"
              placeholder="Assigned To"
              value={form.assignedTo}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <input
              type="date"
              name="deadline"
              placeholder="Deadline"
              value={form.deadline}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            />
            <input
              type="date"
              name="workStart"
              placeholder="Work Start"
              value={form.workStart}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            />
            <input
              type="text"
              name="memberUpdate"
              placeholder="Member Update"
              value={form.memberUpdate}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
            />
            <button
              onClick={handleSubmit}
              className="bg-green-600 p-2 rounded flex items-center justify-center gap-2 hover:bg-green-700 transition"
            >
              <Plus /> Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
