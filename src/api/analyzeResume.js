const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    const prompt = `
You are a resume analysis expert. Analyze the following resume and provide:

1. Strengths
2. Weaknesses
3. Suggested improvements
4. Recommended courses (with links if possible)
5. Future scopes based on the profile

Resume content:
${resumeText}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    fs.unlinkSync(req.file.path); // delete uploaded file

    res.json({ analysis: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
