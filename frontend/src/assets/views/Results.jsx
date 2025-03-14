import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const WinnerDashboard = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [declaring, setDeclaring] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await axios.get("http://localhost:8000/adminpanel");
      const electionsData = response.data;
      const updatedElections = await Promise.all(
        electionsData.map(async (election) => {
          try {
            const statsResponse = await axios.get(
              `http://localhost:8000/dashboard/stats/${election.id}/`
            );
            return { ...election, ...statsResponse.data };
          } catch (err) {
            return election;
          }
        })
      );
      setElections(updatedElections);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch elections.");
      setLoading(false);
    }
  };

  const declareWinner = async (electionId) => {
    setDeclaring((prev) => ({ ...prev, [electionId]: true }));
    try {
      await axios.post(
        `http://localhost:8000/dashboard/declare-winner/${electionId}/`
      );
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        window.location.reload();
      }, 5000);
    } catch (err) {
      setError("Failed to declare the winner.");
    }
    setDeclaring((prev) => ({ ...prev, [electionId]: false }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  if (error)
    return <p className="text-center text-red-500 font-medium">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 min-h-screen space-y-6 ml-95 relative">
      <h2 className="text-4xl font-bold text-center text-gray-900">
        Election Winners
      </h2>
      {elections.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No elections available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {elections.map((election) => (
            <div
              key={election.id}
              className="shadow-md border border-gray-300 p-6 rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {election.title}
              </h3>
              {election.winner_declared ? (
                <div className="text-center mt-2">
                  <p className="text-xl font-bold text-green-700">
                    Winner: {election.winner_text}
                  </p>
                  <p className="text-gray-700 text-lg">
                    Total Votes: {election.winner_votes}
                  </p>
                </div>
              ) : (
                <div className="text-center mt-2">
                  <p className="text-gray-600 text-lg">
                    Winner not declared yet.
                  </p>
                  <button
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
                    onClick={() => declareWinner(election.id)}
                    disabled={declaring[election.id]}
                  >
                    {declaring[election.id] ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2 inline" />
                        Declaring...
                      </>
                    ) : (
                      "Declare Winner"
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default WinnerDashboard;
