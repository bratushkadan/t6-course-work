import jwt from 'jsonwebtoken'
import express from 'express'

import { logger } from '../logger';
import { Product } from '../models';

const productsRouter = express.Router()

productsRouter.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send({error: 'Not found'})
        }
        return res.send(product)
    } catch (err) {
        logger.error(err)
        return res.status(500).send({error: 'Server error acquiring products.'})
    }
})
productsRouter.get('', async (_, res) => {
    try {
        const products = await Product.find().lean()
        return res.send(products.map(p => ({
            id: p._id,
            name: p.name,
            description: p.description,
            image_url: p.image_url,
            price: p.price,
            created: p.created,
        })))
    } catch (err) {
        logger.error(err)
        return res.status(500).send({error: 'Server error acquiring products.'})
    }
})

productsRouter.post('', async (req: any, res) => {
    if (!req.isAdmin()) {
        return res.status(404).send({error: 'Not found'})
    }

    const { name, description, image_url, price: priceStr } = req.body
    const price = Number(priceStr)

    if (!name) {
        return res.status(400).send({error: '"name" is missing in body'})
    }
    if (!description) {
        return res.status(400).send({error: '"description" is missing in body'})
    }
    if (!image_url) {
        return res.status(400).send({error: '"image_url" is missing in body'})
    }
    if (!price || !Number.isInteger(Number(price))) {
        return res.status(400).send({error: '"price" is missing in body'})
    }

    try {
        const newProduct = new Product({
            name,
            description,
            image_url,
            price,
            created: Date.now(),
        })
        const product = await newProduct.save()
        return res.send({
            id: product.id,
            name: product.name,
            description: product.description,
            image_url: product.image_url,
            price: product.price,
            created: product.created,
        })
    } catch (err) {
        logger.error(err)
        return res.status(500).send({error: 'Unknown server error'})
    }
})

export {productsRouter}

