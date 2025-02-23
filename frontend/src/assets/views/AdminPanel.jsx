import { useState, useEffect } from "react";
import ElectionForm from "../Vote/ElectionForm";
import UpdateOption from "../Vote/EditOption";

const AdminPanel = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isElectionModalOpen, setIsElectionModalOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Fetch elections when component mounts
  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await fetch("http://localhost:8000/adminpanel/");
      if (!response.ok) throw new Error("Failed to fetch elections.");
      const data = await response.json();
      setElections(data);
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  // Delete Election
  const handleDeleteElection = async (electionId) => {
    try {
      await fetch(`http://localhost:8000/adminpanel/delete/${electionId}/`, {
        method: "DELETE",
      });
      setElections(elections.filter((election) => election.id !== electionId));
    } catch (error) {
      console.error("Error deleting election:", error);
    }
  };

  // Delete Option
  const handleDeleteOption = async (optionId) => {
    try {
      await fetch(
        `http://localhost:8000/adminpanel/vote-options/delete/${optionId}/`,
        {
          method: "DELETE",
        }
      );
      fetchElections(); // Refresh elections after deleting an option
    } catch (error) {
      console.error("Error deleting option:", error);
    }
  };

  return (
    <div className="p-8 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      {/* Create Election Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsElectionModalOpen(true)}
          className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Create Election
        </button>
      </div>

      {/* List of Elections */}
      <div className="space-y-6">
        {elections.map((election) => (
          <div
            key={election.id}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{election.title}</h2>

            {/* Options List */}
            {election.options.length > 0 ? (
              <ul className="mt-4">
                {election.options.map((option) => (
                  <li
                    key={option.id}
                    className="flex justify-between items-center p-3 border-b border-gray-200"
                  >
                    {option.option_text}
                    <div>
                      <button
                        onClick={() => {
                          setSelectedOption(option);
                          setIsOptionModalOpen(true);
                        }}
                        className="text-yellow-500 hover:text-yellow-700 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOption(option.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No options available</p>
            )}

            {/* Edit & Delete Election */}
            <div className="mt-4 flex justify-start space-x-4">
              <button
                onClick={() => handleDeleteElection(election.id)}
                className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700"
              >
                Delete Election
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Election Modal */}
      {isElectionModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <ElectionForm onClose={() => setIsElectionModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Update Election Modal */}
      {selectedElection && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <UpdateElection
              election={selectedElection}
              onUpdate={(updatedElection) => {
                setElections((prev) =>
                  prev.map((e) =>
                    e.id === updatedElection.id ? updatedElection : e
                  )
                );
                setSelectedElection(null);
              }}
              onClose={() => setSelectedElection(null)}
            />
          </div>
        </div>
      )}

      {/* Update Option Modal */}
      {isOptionModalOpen && selectedOption && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <UpdateOption
              optionId={selectedOption.id}
              onUpdate={() => {
                fetchElections(); // Refresh elections after updating an option
                setIsOptionModalOpen(false);
              }}
              onClose={() => setIsOptionModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
