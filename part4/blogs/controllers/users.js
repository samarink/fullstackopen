const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(users);
});

router.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length <= 3) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' });
  }

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'both username and password must be present' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });

  if (user) {
    return response.json(user);
  } else {
    return response.code(404).end();
  }
});

module.exports = router;
