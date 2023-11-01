const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userController = {
  async register(req, res) {
    // Implement user registration logic here
    const { email, password } = req.body;

    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Create a new user
      const newUser = new User({
        email,
        password,
      });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  },
  async login(req, res) {
    // Implement user login logic here
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the stored password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', {
        expiresIn: '1h' // Token expiration time
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  },
};

module.exports = userController;