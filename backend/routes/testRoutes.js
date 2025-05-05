const express = require('express');
const router = express.Router();
const { Test } = require('../models');

// GET /api/tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (err) {
    console.error('Ошибка при создании теста:', err);
    res.status(500).json({ error: 'Ошибка при получении тестов'});
  }
});

// GET /api/tests/:id
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: 'Тест не найден' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении теста' });
  }
});

// POST /api/tests
router.post('/', async (req, res) => {
  try {
    const newTest = await Test.create(req.body);
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании теста' });
  }
});

// PUT /api/tests/:id
router.put('/:id', async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: 'Тест не найден' });

    await test.update(req.body);
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении теста' });
  }
});

// DELETE /api/tests/:id
router.delete('/:id', async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: 'Тест не найден' });

    await test.destroy();
    res.json({ message: 'Тест удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении теста' });
  }
});

module.exports = router;
