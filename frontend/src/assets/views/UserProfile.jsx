export default function UserProfile() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-gray-600">Manage your profile and voting history.</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p>Email: john@example.com</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
