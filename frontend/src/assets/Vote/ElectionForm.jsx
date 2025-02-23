import { useState, useEffect } from "react";
import axios from "axios";

const ElectionForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const [electionId, setElectionId] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // Track current step: 1 for title, 2 for options
  const [elections, setElections] = useState([]); // To store elections
  const [selectedElection, setSelectedElection] = useState(null); // Selected election ID

  // Fetch elections on component mount
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/adminpanel/");
        setElections(response.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
        setError("Failed to load elections.");
      }
    };
    fetchElections();
  }, []); // Only fetch elections once, on initial load

  // Refetch elections after adding a new election
  const refetchElections = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/adminpanel/");
      setElections(response.data);
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  // Add a new empty option
  const addOption = () => setOptions([...options, ""]);

  // Remove an option by index
  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  // Handle change of option text
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle the submission of the election title form
  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await axios.post("http://127.0.0.1:8000/adminpanel/", {
        title, // Only sending the title of the election
      });
      setElectionId(response.data.id); // Save the election ID from the response
      setStep(2); // Move to options step after election is created
      await refetchElections(); // Refetch elections to update the list
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setError(error.response.data.detail || "Failed to create election.");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  // Handle the submission of the options form
  const handleOptionSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      // Send the election ID for each option
      await Promise.all(
        options.map((option) =>
          axios.post("http://127.0.0.1:8000/adminpanel/vote-options/", {
            election: selectedElection, // ForeignKey reference to the selected election
            option_text: option,
          })
        )
      );
      alert("Options added successfully!");
      onClose(); // Close the modal after success
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setError(error.response.data.detail || "Failed to add options.");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {step === 1 ? "Create Election" : "Add Options"}
      </h2>
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}

      {/* Close Button with Emoji */}
      <button onClick={onClose} className="absolute top-2 right-2 text-2xl">
        ❌
      </button>

      {step === 1 ? (
        // Election Title Form
        <form onSubmit={handleTitleSubmit} className="flex flex-col gap-3">
          <label className="font-medium">Title of Election:</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      ) : (
        // Election Options Form
        <form onSubmit={handleOptionSubmit} className="flex flex-col gap-3">
          <label className="font-medium">Select Election:</label>
          <select
            value={selectedElection}
            onChange={(e) => setSelectedElection(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Select an election</option>
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.title}
              </option>
            ))}
          </select>

          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                className="border p-2 rounded flex-1"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              {options.length > 1 && (
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                  onClick={() => removeOption(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={addOption}
          >
            + Add Option
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ElectionForm;
