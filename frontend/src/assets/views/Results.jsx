export default function Results() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Voting Results</h1>
      <p className="text-gray-600">
        Live election results will be displayed here.
      </p>
      <div className="mt-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg mb-2">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-4xl font-bold">1,245 votes</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Jane Smith</h2>
          <p className="text-4xl font-bold">1,180 votes</p>
        </div>
      </div>
    </div>
  );
}
