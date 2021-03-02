import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config
  );
  return response.data;
};

const remove = async (objectToRemove) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(
    `${baseUrl}/${objectToRemove.id}`,
    config
  );
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll, setToken, create, update, remove };
