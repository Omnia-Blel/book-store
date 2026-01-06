// backend/routes/articles.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { Op } = require('sequelize');

// GET - Récupérer tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['date', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des articles',
      message: error.message 
    });
  }
});

// POST - Créer un nouvel article
router.post('/', async (req, res) => {
  const { title, author, content } = req.body;

  try {
    const newArticle = await Article.create({
      title: title?.trim(),
      author: author?.trim(),
      content: content?.trim()
    });

    res.status(201).json({
      message: 'Article créé avec succès',
      article: newArticle
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(400).json({ 
      error: 'Erreur lors de la création de l\'article',
      message: error.message 
    });
  }
});

// GET - Chercher articles par mot-clé
router.get('/search/:keyword', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${req.params.keyword}%` } },
          { content: { [Op.like]: `%${req.params.keyword}%` } }
        ]
      },
      order: [['date', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    console.error('Erreur lors de la recherche d\'articles:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la recherche d\'articles',
      message: error.message 
    });
  }
});

// GET - Chercher articles par auteur
router.get('/author/:author', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { author: req.params.author },
      order: [['date', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des articles',
      message: error.message 
    });
  }
});

// GET - Récupérer un article par ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    
    res.json(article);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération de l\'article',
      message: error.message 
    });
  }
});

// PUT - Mettre à jour un article
router.put('/:id', async (req, res) => {
  const { title, author, content } = req.body;
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    await article.update({
      title: title?.trim(),
      author: author?.trim(),
      content: content?.trim()
    });

    res.json({
      message: 'Article mis à jour avec succès',
      article
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour de l\'article',
      message: error.message 
    });
  }
});

// DELETE - Supprimer un article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    await article.destroy();

    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la suppression de l\'article',
      message: error.message 
    });
  }
});

module.exports = router;