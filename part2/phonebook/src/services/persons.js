import axios from 'axios';
const baseurl = 'http://localhost:3001/persons';

const getAtll = () => {
  const req = axios.get(baseurl);
  return req.then((res) => res.data);
};

const create = (newPerson) => {
  const req = axios.post(baseurl, newPerson);
  return req.then((res) => res.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseurl}/${id}`);
  return req.then((res) => res.data);
};

export default {
  getAtll,
  create,
  remove,
};
