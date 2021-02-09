import axios from 'axios';
const baseurl = '/api/persons';

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

const update = (id, newPerson) => {
  const req = axios.put(`${baseurl}/${id}`, newPerson);
  return req.then((res) => res.data);
};

export default {
  getAtll,
  create,
  remove,
  update,
};
