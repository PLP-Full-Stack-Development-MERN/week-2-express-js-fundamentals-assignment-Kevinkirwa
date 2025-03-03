let users = []; // In-memory storage

exports.getUsers = (req, res) => {
  res.json({ success: true, data: users });
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, data: user });
};

exports.createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};

exports.updateUser = (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  users[userIndex] = { id: Number(req.params.id), ...req.body };
  res.json({ success: true, data: users[userIndex] });
};

exports.deleteUser = (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const removedUser = users.splice(userIndex, 1);
  res.json({ success: true, data: removedUser });
};
