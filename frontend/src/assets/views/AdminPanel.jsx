import { useState, useEffect } from "react";
import VoteTitle from "../Vote/VoteTitle";
import VoteOption from "../Vote/VoteOption";

export default function AdminPanel() {
  const [votes, setVotes] = useState([]);
  const [options, setOptions] = useState([]);
  const [modal, setModal] = useState(null);
  const [editingVote, setEditingVote] = useState(null);
  const [editingOption, setEditingOption] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/adminpanel/");
        const data = await res.json();
        setVotes(data);
      } catch (error) {
        console.error("Failed to load votes", error);
      }
    };

    const fetchOptions = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/adminpanel/vote-options/"
        );
        const data = await res.json();
        setOptions(data);
      } catch (error) {
        console.error("Failed to load vote options", error);
      }
    };

    fetchVotes();
    fetchOptions();
  }, []);

  const deleteVote = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/adminpanel/${id}/`, {
        method: "DELETE",
      });
      setVotes(votes.filter((vote) => vote.id !== id));
    } catch (error) {
      console.error("Failed to delete vote", error);
    }
  };

  const deleteOption = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/adminpanel/vote-options/${id}/`, {
        method: "DELETE",
      });
      setOptions(options.filter((option) => option.id !== id));
    } catch (error) {
      console.error("Failed to delete option", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200 mt-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Panel
      </h2>

      {/* Buttons to open modals */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setModal("vote")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
        >
          Add Vote Title
        </button>
        <button
          onClick={() => setModal("option")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
        >
          Add Vote Option
        </button>
      </div>

      {/* Vote List */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700">Votes</h3>
        <ul className="list-none mt-2 space-y-2">
          {votes.length ? (
            votes.map((vote) => (
              <li
                key={vote.id}
                className="bg-gray-100 p-2 rounded-lg shadow-sm flex justify-between items-center"
              >
                <span>{vote.title}</span>
                <div>
                  <button
                    onClick={() => setEditingVote(vote)}
                    className="bg-black hover:bg-gray-700 text-white px-2 py-1 rounded mr-2 transition-transform transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVote(vote.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-transform transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No votes available.</p>
          )}
        </ul>
      </div>

      {/* Vote Option List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Vote Options</h3>
        <ul className="list-none mt-2 space-y-2">
          {options.length ? (
            options.map((option) => (
              <li
                key={option.id}
                className="bg-gray-100 p-2 rounded-lg shadow-sm flex justify-between items-center"
              >
                <span>
                  {option.option_text} (Vote:{" "}
                  {votes.find((v) => v.id === option.vote_title)?.title ||
                    "Unknown"}
                  )
                </span>
                <div>
                  <button
                    onClick={() => setEditingOption(option)}
                    className="bg-black hover:bg-gray-700 text-white px-2 py-1 rounded mr-2 transition-transform transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOption(option.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-transform transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No options available.</p>
          )}
        </ul>
      </div>

      {/* Modal Handling */}
      {modal === "vote" && (
        <VoteTitle
          closeModal={() => setModal(null)}
          onVoteCreated={(vote) => setVotes([...votes, vote])}
        />
      )}
      {modal === "option" && (
        <VoteOption
          closeModal={() => setModal(null)}
          onOptionCreated={(option) => setOptions([...options, option])}
        />
      )}

      {/* Edit Modal Handling */}
      {editingVote && (
        <VoteTitle
          closeModal={() => setEditingVote(null)}
          vote={editingVote}
          onVoteUpdated={(updatedVote) => {
            setVotes(
              votes.map((v) => (v.id === updatedVote.id ? updatedVote : v))
            );
            setEditingVote(null);
          }}
        />
      )}
      {editingOption && (
        <VoteOption
          closeModal={() => setEditingOption(null)}
          option={editingOption}
          onOptionUpdated={(updatedOption) => {
            setOptions(
              options.map((o) =>
                o.id === updatedOption.id ? updatedOption : o
              )
            );
            setEditingOption(null);
          }}
        />
      )}
    </div>
  );
}
