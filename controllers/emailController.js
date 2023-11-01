const Email = require('../models/email');
const User = require('../models/user');

const emailController = {
  async sendEmail(req, res) {
    // Implement sending email logic here
    const { senderId, receiverId, subject, body } = req.body;

    try {
      // Check if both sender and receiver exist
      const sender = await User.findById(senderId);
      const receiver = await User.findById(receiverId);

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }

      // Create a new email
      const newEmail = new Email({
        sender: sender._id,
        receiver: receiver._id,
        subject,
        body
        // Other email fields...
      });

      // Save the new email to the database
      await newEmail.save();

      res.status(201).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send email', error: error.message  });
    }
  },
  async getInbox(req, res) {
    // Implement fetching inbox emails for a specific user
    const { userId } = req.params;

    try {
      // Find emails where the provided userId is the receiver
      const inboxEmails = await Email.find({ receiver: userId }).populate('sender', 'email');

      res.status(200).json(inboxEmails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch inbox emails', error: error.message });
    }
  },
};

module.exports = emailController;