const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/test',async(req,res)=>{
  return res.send("test");
})
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.send(invoices);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/count/total', async (req, res) => {
  try {
    const count = await Invoice.countDocuments();
    console.log(count)
    res.send({ count });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;