export default function AdminPanel() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-gray-600">Manage users, candidates, and votes.</p>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Reset Votes
      </button>
    </div>
  );
}
