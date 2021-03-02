import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    case 'LIKE':
      return state.map((blog) =>
        blog.id !== action.id ? blog : { ...blog, likes: blog.likes + 1 }
      );
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.id);
    default:
      return state;
  }
};

export const blogsInit = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({ type: 'INIT', data: blogs });
};

export const blogAdd = (object) => async (dispatch) => {
  const blog = await blogService.create(object);
  dispatch({ type: 'ADD', data: blog });
};

export const blogLike = (object) => async (dispatch) => {
  const blog = await blogService.update(object);
  dispatch({ type: 'LIKE', id: blog.id });
};

export const blogDelete = (object) => async (dispatch) => {
  await blogService.remove(object);
  dispatch({ type: 'DELETE', id: object.id });
};

export default reducer;
