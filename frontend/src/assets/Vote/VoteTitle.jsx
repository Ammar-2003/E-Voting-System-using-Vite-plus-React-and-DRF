import { useState } from "react";

export default function VoteTitle({ closeModal, onVoteCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Title cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/adminpanel/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, created_by: 1 }),
      });

      if (!response.ok) throw new Error("Failed to create vote title");

      const newVote = await response.json();
      onVoteCreated(newVote); // Update parent state
      closeModal(); // Close modal
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Vote Title</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter vote title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-400 text-white p-2 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
