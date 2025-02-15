// voteService.js

export const getCandidates = async () => {
  // Simulating fetching data (replace with API call if needed)
  return [
    { id: 1, name: "Alice Johnson", party: "Democratic", color: "bg-blue-500" },
    { id: 2, name: "Robert Smith", party: "Republican", color: "bg-red-500" },
    {
      id: 3,
      name: "Emma Williams",
      party: "Independent",
      color: "bg-green-500",
    },
  ];
};

export const castVote = async (candidateId) => {
  // Simulating a vote submission (replace with API call)
  console.log(`✅ Vote cast for Candidate ID: ${candidateId}`);
  return { success: true, message: "Vote successfully submitted!" };
};
