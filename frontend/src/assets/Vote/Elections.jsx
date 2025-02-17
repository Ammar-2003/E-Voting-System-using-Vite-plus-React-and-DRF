import { useState, useEffect } from "react";

function Elections({ onClose }) {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [options, setOptions] = useState([{ option_text: "" }]);

  // Fetch elections dynamically from the API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/adminpanel/") // Corrected the endpoint to fetch from the API
      .then((response) => response.json())
      .then((data) => setElections(data))
      .catch((error) => console.error("Error fetching elections:", error));
  }, []);

  // Handle option input change
  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].option_text = event.target.value;
    setOptions(newOptions);
  };

  // Add a new option to the list
  const addOption = () => {
    setOptions([...options, { option_text: "" }]);
  };

  // Remove an option from the list
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedElection) {
      alert("Please select an election.");
      return;
    }

    const electionData = {
      election_number: selectedElection.election_number, // Use dynamic election_number
      title: selectedElection.title, // Use dynamic title
      options: options, // Add options dynamically
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/adminpanel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(electionData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Election created successfully:", data);
        onClose(); // Close the modal after successful election creation
      } else {
        console.error("Failed to create election");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Create Election
      </h3>

      {/* Election selection */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="election">
          Select Election:
        </label>
        <select
          id="election"
          value={selectedElection?.id || ""}
          onChange={(e) =>
            setSelectedElection(elections.find((e) => e.id === e.target.value))
          }
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an Election</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>
              {election.title} (Election No. {election.election_number})
            </option>
          ))}
        </select>
      </div>

      {/* Options */}
      <h4 className="text-xl font-semibold mb-4">Options</h4>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            value={option.option_text}
            onChange={(e) => handleOptionChange(index, e)}
            placeholder="Option text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {options.length > 1 && (
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="ml-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Option Button */}
      <button
        type="button"
        onClick={addOption}
        className="w-full py-2 mt-4 mb-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Add Option
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Election
      </button>
    </form>
  );
}

export default Elections;
