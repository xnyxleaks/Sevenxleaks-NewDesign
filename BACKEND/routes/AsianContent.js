const express = require('express');
const router = express.Router();
const { AsianContent } = require('../models');
const verifyToken = require('../Middleware/verifyToken');
const isAdmin = require('../Middleware/isAdmin');
const { Op, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

function insertRandomChar(base64Str) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomChar = letters.charAt(Math.floor(Math.random() * letters.length));
  return base64Str.slice(0, 2) + randomChar + base64Str.slice(2);
}

function encodePayloadToBase64(payload) {
  const jsonStr = JSON.stringify(payload);
  const base64Str = Buffer.from(jsonStr).toString('base64');
  return insertRandomChar(base64Str);
}

// POST - Create Asian content
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    let asianContents = req.body;

    if (Array.isArray(asianContents)) {
      for (let i = 0; i < asianContents.length; i++) {
        asianContents[i].slug = uuidv4();
      }
      const createdContents = await AsianContent.bulkCreate(asianContents);
      return res.status(201).json(createdContents);
    } else {
      asianContents.slug = uuidv4();
      const createdContent = await AsianContent.create(asianContents);
      return res.status(201).json(createdContent);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar conteúdo asiático: ' + error.message });
  }
});

// GET with search
router.get('/search', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { search, category, month, region, sortBy = 'id', sortOrder = 'ASC' } = req.query;

    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }
    if (category) {
      where.category = category;
    }
    if (region) {
      where.region = region;
    }
    if (month) {
      where.postDate = {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "postDate"')),
            month
          )
        ]
      };
    }

    const { count, rows } = await AsianContent.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit,
      offset
    });

    const payload = {
      page,
      perPage: limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows
    };

    const encodedPayload = encodePayloadToBase64(payload);
    return res.status(200).json({ data: encodedPayload });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conteúdos asiáticos: ' + error.message });
  }
});

// GET all
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 900;
    const offset = (page - 1) * limit;
    const { region } = req.query;

    const where = {};
    if (region) {
      where.region = region;
    }

    const asianContents = await AsianContent.findAll({
      where,
      limit,
      offset,
      order: [['postDate', 'DESC']],
    });

    const payload = {
      page,
      perPage: limit,
      data: asianContents,
    };

    const encodedPayload = encodePayloadToBase64(payload);
    res.status(200).json({ data: encodedPayload });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conteúdos asiáticos: ' + error.message });
  }
});

// GET by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const asianContent = await AsianContent.findOne({ where: { slug } });

    if (!asianContent) {
      return res.status(404).json({ error: 'Conteúdo asiático não encontrado com esse slug' });
    }

    const encodedContent = encodePayloadToBase64(asianContent);
    res.status(200).json({ data: encodedContent });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conteúdo asiático por slug: ' + error.message });
  }
});

// PUT - Update
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const asianContent = await AsianContent.findByPk(id);
    if (!asianContent) {
      return res.status(404).json({ error: 'Conteúdo asiático não encontrado' });
    }

    await asianContent.update(updateData);
    res.status(200).json(asianContent);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar conteúdo asiático: ' + error.message });
  }
});

// DELETE
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const asianContent = await AsianContent.findByPk(id);
    if (!asianContent) {
      return res.status(404).json({ error: 'Conteúdo asiático não encontrado' });
    }

    await asianContent.destroy();
    res.status(200).json({ message: 'Conteúdo asiático deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar conteúdo asiático: ' + error.message });
  }
});

module.exports = router;
