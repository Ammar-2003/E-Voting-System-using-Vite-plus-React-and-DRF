import { useState, useEffect } from "react";

export default function VoteOption({ closeModal, onOptionCreated }) {
  const [votes, setVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState("");
  const [optionText, setOptionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/adminpanel/")
      .then((res) => res.json())
      .then((data) => setVotes(data))
      .catch(() => setMessage("Failed to load vote titles"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!optionText.trim() || !selectedVote) {
      setMessage("Please select a vote and enter an option.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/adminpanel/vote-options/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            option_text: optionText,
            vote_title: selectedVote,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create option");

      const newOption = await response.json();
      onOptionCreated(newOption);
      closeModal();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Vote Option</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <select
            value={selectedVote}
            onChange={(e) => setSelectedVote(e.target.value)}
            className="border p-2 w-full rounded mb-4"
            required
          >
            <option value="">-- Select a Vote --</option>
            {votes.map((vote) => (
              <option key={vote.id} value={vote.id}>
                {vote.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter option"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
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
