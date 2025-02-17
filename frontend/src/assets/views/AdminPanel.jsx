import React, { useState } from "react";
import Elections from "../Vote/Elections";

const AdminPanel = () => {
  const [showElectionForm, setShowElectionForm] = useState(false);

  // Open and close modal
  const openElectionForm = () => setShowElectionForm(true);
  const closeElectionForm = () => setShowElectionForm(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

        {/* Create Election Button */}
        <div className="flex justify-center">
          <button
            onClick={openElectionForm}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Create Election
          </button>
        </div>

        {/* Modal */}
        {showElectionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <button
                onClick={closeElectionForm}
                className="absolute top-2 right-2 text-red-600 text-xl"
              >
                &times;
              </button>
              <Elections onClose={closeElectionForm} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
