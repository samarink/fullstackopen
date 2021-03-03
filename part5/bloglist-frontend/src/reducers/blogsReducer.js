import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id !== action.id ? blog : { ...blog, likes: blog.likes + 1 }
      );
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    default:
      return state;
  }
};

export const blogsInit = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({ type: 'INIT_BLOGS', data: blogs });
};

export const blogAdd = (object) => async (dispatch) => {
  const blog = await blogService.create(object);
  dispatch({ type: 'ADD_BLOG', data: blog });
};

export const blogLike = (object) => async (dispatch) => {
  const blog = await blogService.update({ ...object, likes: object.likes + 1, user: object.user.id });
  dispatch({ type: 'LIKE_BLOG', id: blog.id });
};

export const blogDelete = (object) => async (dispatch) => {
  await blogService.remove(object);
  dispatch({ type: 'DELETE_BLOG', id: object.id });
};

export default reducer;
