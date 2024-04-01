import jwt from 'jsonwebtoken'
import express from 'express'

import { logger } from '../logger';
import { UserModel } from '../models';

const userRouter = express.Router()

userRouter.post('', async (req, res) => {
    const {first_name, last_name, email, password, phone_number} = req.body


    if (!first_name) {
        return res.status(400).send({error: '"first_name" is missing'})
    }
    if (!last_name) {
        return res.status(400).send({error: '"last_name" is missing'})
    }
    if (!email) {
        return res.status(400).send({error: '"email" is missing'})
    }
    if (!password) {
        return res.status(400).send({error: '"password" is missing'})
    }
    if (!phone_number) {
        return res.status(400).send({error: '"phone_number" is missing'})
    }

    try {
        const user = new UserModel({
            first_name,
            last_name,
            email,
            password,
            phone_number,
        })
        const savedUser = await user.save()
        return res.send({
            id: savedUser.id,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            email: savedUser.email,
            phone_number: savedUser.phone_number,
        })
    } catch (err) {
        logger.error(err)
        return res.status(500).send({error: 'Unknown server error'})
    }
})
userRouter.get('/me', (req, res) => {
  const token = req.get('X-Auth-Token');

  return jwt.verify(token as string, "secretkey", async (err: unknown, decoded: unknown) => {
    if (err) {
      return res.status(500).send({error: 'Failed to authenticate token.' });
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
        res.send({
            id: fetchedUser.id,
            first_name: fetchedUser.first_name,
            last_name: fetchedUser.last_name,
            phone_number: fetchedUser.phone_number,
            email: (decoded as unknown as {email: string}).email,
        });
    } catch (err) {
        logger.error(err)
        res.status(500)
        res.send({error: 'unknown error'})
        return
    }
  });
})

export {userRouter}

