const express = require("express");
const router = express.Router();
const { Question, AnswerOption } = require("../models");

// CREATE question with options
router.post("/", async (req, res) => {
  try {
    const { testId, text, type, points, options } = req.body;

    const question = await Question.create({ testId, text, type, points });

    if (type !== "text" && Array.isArray(options)) {
      const formattedOptions = options.map(option => ({
        ...option,
        questionId: question.id
      }));
      await AnswerOption.bulkCreate(formattedOptions);
    }

    res.status(201).json({ message: "Question created", question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: AnswerOption, as: "options" }]
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [{ model: AnswerOption, as: "options" }]
    });

    if (!question) return res.status(404).json({ error: "Question not found" });

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE question (and optionally its options)
router.put("/:id", async (req, res) => {
  try {
    const { text, type, points, options } = req.body;
    const question = await Question.findByPk(req.params.id);

    if (!question) return res.status(404).json({ error: "Question not found" });

    await question.update({ text, type, points });

    if (options) {
      await AnswerOption.destroy({ where: { questionId: question.id } });
      const newOptions = options.map(option => ({
        ...option,
        questionId: question.id
      }));
      await AnswerOption.bulkCreate(newOptions);
    }

    res.json({ message: "Question updated", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE question
router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    await AnswerOption.destroy({ where: { questionId: question.id } });
    await question.destroy();

    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
