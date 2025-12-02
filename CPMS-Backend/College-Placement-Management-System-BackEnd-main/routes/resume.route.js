const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:filename", (req, res) => {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, "..", "public", "resumes", filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.log("Error sending file:", err);
            res.status(404).json({ message: "Resume not found" });
        }
    });
});

module.exports = router;
