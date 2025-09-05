const express = require('express');
const router = express.Router();
const { VipWesternContent } = require('../models');
const verifyToken = require('../Middleware/verifyToken');
const isAdmin = require('../Middleware/isAdmin');
const { Op, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { VipAsianContent, VipBannedContent, VipUnknownContent } = require('../models');

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

// POST - Create VIP Western content
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    let vipWesternContents = req.body;

    if (Array.isArray(vipWesternContents)) {
      for (let i = 0; i < vipWesternContents.length; i++) {
        vipWesternContents[i].slug = uuidv4();
      }
      const createdContents = await VipWesternContent.bulkCreate(vipWesternContents);
      return res.status(201).json(createdContents);
    } else {
      vipWesternContents.slug = uuidv4();
      const createdContent = await VipWesternContent.create(vipWesternContents);
      return res.status(201).json(createdContent);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar conteúdo VIP ocidental: ' + error.message });
  }
});

// GET with search
router.get('/search', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { search, category, month, sortBy = 'postDate', sortOrder = 'DESC' } = req.query;

    let allResults = [];
    
    // Busca universal em todas as tabelas VIP
    if (search) {
      const searchWhere = { name: { [Op.iLike]: `%${search}%` } };
      
      // Adiciona filtro de mês se especificado
      if (month) {
        searchWhere.postDate = {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "postDate"')),
              month
            )
          ]
        };
      }
      
      // Busca em VipAsianContent
      const vipAsianResults = await VipAsianContent.findAll({
        where: searchWhere,
        order: [[sortBy, sortOrder]],
        raw: true
      });
      
      // Busca em VipWesternContent
      const vipWesternResults = await VipWesternContent.findAll({
        where: searchWhere,
        order: [[sortBy, sortOrder]],
        raw: true
      });
      
      // Busca em VipBannedContent
      const vipBannedResults = await VipBannedContent.findAll({
        where: searchWhere,
        order: [[sortBy, sortOrder]],
        raw: true
      });
      
      // Busca em VipUnknownContent
      const vipUnknownResults = await VipUnknownContent.findAll({
        where: searchWhere,
        order: [[sortBy, sortOrder]],
        raw: true
      });
      
      // Adiciona tipo de conteúdo para identificação
      const vipAsianWithType = vipAsianResults.map(item => ({ ...item, contentType: 'vip-asian' }));
      const vipWesternWithType = vipWesternResults.map(item => ({ ...item, contentType: 'vip-western' }));
      const vipBannedWithType = vipBannedResults.map(item => ({ ...item, contentType: 'vip-banned' }));
      const vipUnknownWithType = vipUnknownResults.map(item => ({ ...item, contentType: 'vip-unknown' }));
      
      // Combina todos os resultados
      allResults = [
        ...vipAsianWithType,
        ...vipWesternWithType,
        ...vipBannedWithType,
        ...vipUnknownWithType
      ];
      
      // Ordena por data
      allResults.sort((a, b) => {
        const dateA = new Date(a.postDate);
        const dateB = new Date(b.postDate);
        return sortOrder === 'DESC' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      });
    } else {
      // Se não há busca, retorna apenas conteúdo VIP western
      const where = {};
      if (category) {
        where.category = category;
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
      
      const results = await VipWesternContent.findAll({
        where,
        order: [[sortBy, sortOrder]],
        raw: true
      });
      
      allResults = results.map(item => ({ ...item, contentType: 'vip-western' }));
    }
    
    // Paginação manual
    const total = allResults.length;
    const paginatedResults = allResults.slice(offset, offset + limit);

    const payload = {
      page,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: paginatedResults
    };

    const encodedPayload = encodePayloadToBase64(payload);
    return res.status(200).json({ data: encodedPayload });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conteúdos VIP ocidentais: ' + error.message });
  }
});

// GET all
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 900;
    const offset = (page - 1) * limit;

    const vipWesternContents = await VipWesternContent.findAll({
      limit,
      offset,
      order: [['postDate', 'DESC']],
    });

    const payload = {
      page,
      perPage: limit,
      data: vipWesternContents,
    };

    const encodedPayload = encodePayloadToBase64(payload);
    res.status(200).json({ data: encodedPayload });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conteúdos VIP ocidentais: ' + error.message });
  }
});

// GET by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const vipWesternContent = await VipWesternContent.findOne({ where: { slug } });

    if (!vipWesternContent) {
      return res.status(404).json({ error: 'Conteúdo VIP ocidental não encontrado com esse slug' });
    }

    const encodedContent = encodePayloadToBase64(vipWesternContent);
    res.status(200).json({ data: encodedContent });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conteúdo VIP ocidental por slug: ' + error.message });
  }
});

// PUT - Update
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const vipWesternContent = await VipWesternContent.findByPk(id);
    if (!vipWesternContent) {
      return res.status(404).json({ error: 'Conteúdo VIP ocidental não encontrado' });
    }

    await vipWesternContent.update(updateData);
    res.status(200).json(vipWesternContent);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar conteúdo VIP ocidental: ' + error.message });
  }
});

// DELETE
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const vipWesternContent = await VipWesternContent.findByPk(id);
    if (!vipWesternContent) {
      return res.status(404).json({ error: 'Conteúdo VIP ocidental não encontrado' });
    }

    await vipWesternContent.destroy();
    res.status(200).json({ message: 'Conteúdo VIP ocidental deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar conteúdo VIP ocidental: ' + error.message });
  }
});

module.exports = router;