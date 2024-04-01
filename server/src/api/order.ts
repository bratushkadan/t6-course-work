import jwt from 'jsonwebtoken'
import express from 'express'

import { logger } from '../logger';
import { UserModel, Product, CartPosition, Order } from '../models';

const orderRouter = express.Router()

orderRouter.get('/:id', async (req, res) => {
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
          // TODO: map fields and fix id
          const order = await Order.findOne({user_id: fetchedUser.id, _id: req.params.id})
          if (!order) {
              res.status(404)
              res.send({error: 'order not found'})
              return 
          }
          res.send({
              id: order.id,
              user_id: order.user_id,
              status: order.status,
              created: order.created,
              status_modified: order.status_modified,
              positions: order.positions,
          })
      } catch (err) {
          logger.error(err)
          res.status(500)
          res.send({error: 'unknown error'})
          return
      }
    });
})
orderRouter.get('/', async (req, res) => {
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
          // TODO: map fields and fix id
          const orders = await Order.find({user_id: fetchedUser.id})
          res.send(orders.map(savedOrder => ({
              id: savedOrder.id,
              user_id: savedOrder.user_id,
              status: savedOrder.status,
              created: savedOrder.created,
              status_modified: savedOrder.status_modified,
              positions: savedOrder.positions,
          })))
      } catch (err) {
          logger.error(err)
          res.status(500)
          res.send({error: 'unknown error'})
          return
      }
    });
})
orderRouter.post('', async (req, res) => {
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

          const order = new Order({
              status: 'created',
              user_id: fetchedUser.id,
              created: Date.now(),
              status_modified: Date.now(),
              positions: cartPositions.map(cp => ({
                  product_id: cp.product_id,
                  quantity: cp.quantity,
                  name: cp.name,
                  description: cp.description,
                  price: cp.price,
                  image_url: cp.image_url,
              })),
          })
          const savedOrder = await order.save()
          await CartPosition.deleteMany({user_id: fetchedUser.id})
          res.send({
              id: savedOrder.id,
              user_id: savedOrder.user_id,
              status: savedOrder.status,
              created: savedOrder.created,
              status_modified: savedOrder.status_modified,
              positions: savedOrder.positions,
          })
      } catch (err) {
          logger.error(err)
          res.status(500)
          res.send({error: 'unknown error'})
          return
      }
    });
})

export {orderRouter}

