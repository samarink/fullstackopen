import anecdoteService from '../services/anecdote';

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

export const anecdoteInit = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({ type: 'INIT', data: anecdotes });
};

export const anecdoteVote = (id) => ({
  type: 'VOTE',
  data: {
    id,
  },
});

export const anecdoteAdd = (data) => ({
  type: 'ADD',
  data,
});

export default reducer;
