import { useState, useEffect } from "react";

const UpdateOption = ({ optionId, onUpdate, onClose }) => {
  const [optionText, setOptionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the existing option details
  useEffect(() => {
    const fetchOption = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/adminpanel/vote-options/update/${optionId}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch option.");
        }

        const data = await response.json();
        setOptionText(data.option_text); // Set the fetched option text
      } catch (err) {
        console.error("Error fetching option:", err);
        setError("Failed to load option.");
      }
    };

    fetchOption();
  }, [optionId]);

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8000/adminpanel/vote-options/update/${optionId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ option_text: optionText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update option.");
      }

      const updatedOption = await response.json();
      onUpdate(updatedOption); // Update option in UI
      onClose(); // Close modal after successful update
    } catch (err) {
      console.error("Error updating option:", err);
      setError("Failed to update option. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Update Option</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        value={optionText}
        onChange={(e) => setOptionText(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter new option text"
      />

      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`py-2 px-4 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateOption;
