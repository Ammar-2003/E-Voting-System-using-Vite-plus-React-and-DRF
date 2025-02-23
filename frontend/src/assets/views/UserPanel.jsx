import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

const UserPanel = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/adminpanel/")
      .then((response) => setElections(response.data))
      .catch((error) => console.error("Error fetching elections:", error));
  }, []);

  const handleElectionSelect = (election) => {
    setSelectedElection(election);
    setSelectedOption(null);
    setMessage("");

    axios
      .get(`http://localhost:8000/adminpanel/details/${election.id}/`)
      .then((response) => setOptions(response.data.options))
      .catch((error) => console.error("Error fetching options:", error));
  };

  const handleVote = async () => {
    if (!selectedOption) {
      setMessage("Please select an option to vote.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/userpanel/",
        {
          election: selectedElection.id,
          selected_option: selectedOption.id,
        }
        // Uncomment this when authentication is added
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // }
      );

      setMessage(response.data.message || "Vote submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Error submitting vote.");
    }
  };

  return (
    <div className="flex flex-col items-start p-6 ml-[500px] mt-8">
      {/* Increased margin-left to 280px to center based on sidenav */}

      <motion.h2
        className="text-3xl font-bold text-black mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🗳️ E-Voting System
      </motion.h2>

      {/* Election Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elections.map((election) => (
          <motion.div
            key={election.id}
            className={`p-6 shadow-lg rounded-xl border cursor-pointer transition-transform transform hover:scale-105 ${
              selectedElection?.id === election.id
                ? "border-black"
                : "border-gray-300"
            }`}
            onClick={() => handleElectionSelect(election)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-semibold">{election.title}</h3>
            <p className="text-gray-500">{election.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Options Selection */}
      {selectedElection && (
        <motion.div
          className="mt-8 w-full max-w-lg p-6 shadow-xl border rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Voting for: {selectedElection.title}
          </h3>

          <div className="space-y-4">
            {options.length === 0 ? (
              <p className="text-gray-500">Fetching options...</p>
            ) : (
              options.map((option) => (
                <motion.div
                  key={option.id}
                  className={`p-4 border rounded-xl cursor-pointer flex items-center justify-between transition ${
                    selectedOption?.id === option.id
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedOption(option)}
                  whileHover={{ scale: 1.02 }}
                >
                  <span>{option.option_text}</span>
                  {selectedOption?.id === option.id && (
                    <AiOutlineCheckCircle className="text-black text-2xl" />
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleVote}
            className="mt-6 w-full bg-black text-white py-2 rounded-xl text-lg font-semibold hover:opacity-90 transition"
            whileTap={{ scale: 0.95 }}
          >
            Submit Vote
          </motion.button>

          {message && (
            <p className="mt-4 text-red-500 text-center">{message}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserPanel;
