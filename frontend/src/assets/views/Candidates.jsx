export default function Candidates() {
  const candidates = [
    { id: 1, name: "John Doe", party: "Democratic Party", votes: 450 },
    { id: 2, name: "Jane Smith", party: "Republican Party", votes: 375 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Candidates</h1>
      <div className="grid grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-600">{candidate.party}</p>
            <p className="text-blue-500 font-bold">Votes: {candidate.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
