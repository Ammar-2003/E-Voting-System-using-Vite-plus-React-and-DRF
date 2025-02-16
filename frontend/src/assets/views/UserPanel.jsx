import React, { useState } from "react";

const VoteForm = () => {
  const [userId, setUserId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const voteData = {
      user: parseInt(userId),
      selected_option: parseInt(selectedOption),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/userpanel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        setMessage("✅ Vote submitted successfully!");
        setUserId("");
        setSelectedOption("");
      } else {
        throw new Error("❌ Failed to submit vote.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🗳️ Vote Now</h2>
      {message && <p className="text-center text-green-400">{message}</p>}
      <form onSubmit={handleVoteSubmit} className="grid gap-4">
        {/* User ID Input */}
        <input
          type="number"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        {/* Voting Option Dropdown */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          required
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Vote"}
        </button>
      </form>
    </div>
  );
};

export default VoteForm;
