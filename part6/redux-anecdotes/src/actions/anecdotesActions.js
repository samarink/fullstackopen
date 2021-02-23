export const anecdoteVote = (id) => ({
  type: 'VOTE',
  data: {
    id,
  },
});
