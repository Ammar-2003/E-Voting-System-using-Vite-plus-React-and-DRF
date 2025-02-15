import { useEffect, useState } from "react";
import { getCandidates, castVote } from "../services/voteService";

export default function VotePage() {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await getCandidates();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const handleVote = async (id) => {
    setSelected(id);
    const response = await castVote(id);
    setMessage(response.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Vote for Your Candidate
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => handleVote(candidate.id)}
            className={`p-4 rounded-lg shadow-lg text-white text-lg font-semibold transition-all ${
              candidate.color
            } ${
              selected === candidate.id
                ? "ring-4 ring-yellow-300"
                : "hover:scale-105"
            }`}
          >
            {candidate.name} ({candidate.party})
          </button>
        ))}
      </div>

      {message && (
        <p className="mt-6 text-green-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
