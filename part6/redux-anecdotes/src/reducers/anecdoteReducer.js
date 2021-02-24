const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.data.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    case 'ADD':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    default:
      return state;
  }
};

export const anecdoteInit = (anecdotes) => ({
  type: 'INIT',
  data: anecdotes,
});

export const anecdoteVote = (id) => ({
  type: 'VOTE',
  data: {
    id,
  },
});

export const anecdoteAdd = (content) => ({
  type: 'ADD',
  data: {
    content,
    votes: 0,
  },
});

export default reducer;
