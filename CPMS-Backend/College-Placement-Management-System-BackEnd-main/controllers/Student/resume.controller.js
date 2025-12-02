const User = require('../../models/user.model');

const UploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No resume uploaded');
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send('Student not found!');
    }

    const resumePath = "/" + req.file.fieldname + "/" + req.file.filename;

    user.studentProfile.resume = {
      filename: req.file.filename,
      filepath: resumePath,
      contentType: req.file.mimetype
    };

    await user.save();

    return res.status(200).json({
      msg: 'Resume uploaded successfully!',
      resume: user.studentProfile.resume   // 👈 returned to frontend
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error', error });
  }
};

module.exports = UploadResume;
