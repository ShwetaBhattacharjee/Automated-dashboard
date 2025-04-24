"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    try {
      const res = await axios.get("/api/tracker");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setForm({
      ...form,
      [name]: date ? date.toISOString().split("T")[0] : "",
    });
  };

  const handleSubmit = async () => {
    try {
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
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  const handleEdit = (item: WorkItem) => {
    setForm(item);
  };

  const handleDelete = async (id?: string) => {
    try {
      if (id) {
        await axios.delete(`/api/tracker/${id}`);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete data:", error);
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

  const isDeadlineOver = (deadline: string) => {
    return deadline && new Date(deadline) < new Date(new Date().toDateString());
  };

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
          className="mb-6 w-full p-3 rounded-lg bg-[#1f1f1f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="bg-[#1a1a1a] p-6 rounded-xl mb-10 shadow-lg">
          <div className="grid sm:grid-cols-4 gap-4">
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="p-3 rounded-lg bg-[#2b2b2b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Unit</option>
              <option value="AI">AI</option>
              <option value="INFLUENCER">INFLUENCER</option>
              <option value="MANAGEMENT">MANAGEMENT</option>
              <option value="BR UNIT">BR UNIT</option>
            </select>

            <input
              name="task"
              value={form.task}
              onChange={handleChange}
              placeholder="Task"
              className="p-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              placeholder="Assigned To"
              className="p-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="memberUpdate"
              value={form.memberUpdate}
              onChange={handleChange}
              placeholder="Update"
              className="p-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <DatePicker
              selected={form.workStart ? new Date(form.workStart) : null}
              onChange={(date) => handleDateChange(date, "workStart")}
              placeholderText="Work Start (Task Begin Date)"
              className="p-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              selected={form.deadline ? new Date(form.deadline) : null}
              onChange={(date) => handleDateChange(date, "deadline")}
              placeholderText="Deadline (Task Due Date)"
              className="p-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              dateFormat="yyyy-MM-dd"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-3 rounded-lg bg-[#2b2b2b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> {form._id ? "Update" : "Add"}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full text-sm text-left text-white">
            <thead className="bg-[#1f1f1f] text-gray-300">
              <tr>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Assigned</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, visibleCount).map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-800 hover:bg-[#232323]"
                >
                  <td className="px-4 py-3">{item.unit}</td>
                  <td className="px-4 py-3">{item.task}</td>
                  <td className="px-4 py-3">{item.assignedTo}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Done"
                          ? "bg-green-600"
                          : item.status === "In Progress"
                          ? "bg-yellow-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.workStart}</td>
                  <td className="px-4 py-3">
                    {isDeadlineOver(item.deadline) ? (
                      <span className="text-red-500 font-semibold">
                        Deadline Over
                      </span>
                    ) : (
                      item.deadline
                    )}
                  </td>
                  <td className="px-4 py-3">{item.memberUpdate}</td>
                  <td className="px-4 py-3">
                    {new Date(item.lastUpdated).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-yellow-400 hover:text-yellow-600"
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
