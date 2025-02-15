export default function Dashboard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome to the E-Voting System!</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Total Votes</h2>
          <p className="text-4xl font-bold">1,245</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Candidates</h2>
          <p className="text-4xl font-bold">5</p>
        </div>
      </div>
    </div>
  );
}
