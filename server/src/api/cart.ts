import jwt from 'jsonwebtoken'
import express from 'express'

import { logger } from '../logger';
import { UserModel, Product, CartPosition } from '../models';

const cartRouter = express.Router()

cartRouter.get('/', async (req, res) => {
    const token = req.get('X-Auth-Token');

    jwt.verify(token as string, "secretkey", async (err: unknown, decoded: unknown) => {
      if (err) {
        return res.status(400).send({error: 'Failed to authenticate token.' });
      }
      try {
          const fetchedUser = await UserModel.findOne({
              email: (decoded as unknown as {email: string}).email
          })
          if (!fetchedUser) {
              res.status(404)
              res.send({error: 'user not found'})
              return 
          }
          const cartPositions = await CartPosition.find({user_id: fetchedUser.id})
          if (!cartPositions) {
              return res.status(404).send({error: 'Not found'})
          }
          res.send(cartPositions)
      } catch (err) {
          logger.error(err)
          res.status(500)
          res.send({error: 'unknown error'})
          return
      }
    });
})
cartRouter.post('', async (req, res) => {
    const token = req.get('X-Auth-Token');

    jwt.verify(token as string, "secretkey", async (err: unknown, decoded: unknown) => {
      if (err) {
        return res.status(400).send({error: 'Failed to authenticate token.' });
      } 

      const { product_id, quantity: quantityStr } = req.body
      const quantity = Number(quantityStr)

      if (!product_id) {
          return res.status(400).send({error: '"product_id" body param is required'})
      }
      if (!Number.isInteger(quantity)) {
          return res.status(400).send({error: '"quantity" body param is required'})
      }

      try {
          const fetchedUser = await UserModel.findOne({
              email: (decoded as unknown as {email: string}).email
          })
          if (!fetchedUser) {
              res.status(404)
              res.send({error: 'user not found'})
              return 
          }
          const cartPositions = await CartPosition.find({user_id: fetchedUser.id})
          const position = cartPositions.find(cp => cp.product_id === product_id)
          if (!position) {
              const product = await Product.findById(product_id)
              if (!product) {
                  return res.status(400).send({error: 'No such product'})
              }

              const newPosition = new CartPosition({
                  product_id: product.id,
                  user_id: fetchedUser.id,
                  quantity: 1,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  image_url: product.image_url,
              })
              await newPosition.save()

              return res.send({
                  product_id: newPosition.product_id,
                  quantity: newPosition.quantity,
              })
          }

          if (quantity === 0) {
              await position.deleteOne()
              return res.send({product_id, quantity})
          }

          position.set('quantity', quantity)
          const updatedPosition = await position.save()

          res.send({product_id, quantity: updatedPosition.quantity})
      } catch (err) {
          logger.error(err)
          res.status(500)
          res.send({error: 'unknown error'})
          return
      }
    });
})

cartRouter.delete('', async (req: any, res) => {
    const token = req.get('X-Auth-Token');

    jwt.verify(token as string, "secretkey", async (err: unknown, decoded: unknown) => {
      if (err) {
        return res.status(400).send({error: 'Failed to authenticate token.' });
      } 

      try {
          const fetchedUser = await UserModel.findOne({
              email: (decoded as unknown as {email: string}).email
          })
          if (!fetchedUser) {
              res.status(404)
              res.send({error: 'user not found'})
              return 
          }
          await CartPosition.deleteMany({user_id: fetchedUser.id})
          return res.send([])
      } catch (err) {
          logger.error(err)
          res.status(500)
          res.send({error: 'unknown error'})
          return
      }
    });
})

export {cartRouter}

