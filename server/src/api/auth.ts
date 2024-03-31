import bcrypt from 'bcrypt'
import express from 'express' 
import jwt from 'jsonwebtoken'

import { logger } from '../logger'

const authRouter = express.Router()

type AuthToken = {
    token: string
}

class UserAuth {
  email: string;
  password: string;
  token: string;

  private static saltRounds = 10;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = this.setPassword(password);
    this.token = this.generateAuthToken(); 
  }

  setPassword(password: string) {
    return bcrypt.hashSync(password, UserAuth.saltRounds);
  }
  
  checkValidPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
  
  generateAuthToken() {
    return jwt.sign({ email: this.email }, "secretkey");
  }
}

authRouter.get('/token/user', (req, res) => {
    const {email, password} = req.query

    try {
        // Fetch the user from database
        const user = new UserAuth(email as string, password as string);

        // If the user is found and password is valid
        if (user.checkValidPassword(password as string)) {
            return res.send({ token: user.generateAuthToken() });
        }
    } catch (err) {
        logger.error(err)
        return res.status(500).send({error: String(err)})
    }

    return res.status(400).send({error: "Email or password is not correct"});
})
authRouter.post('/token/user', (req, res) => {
  const token = req.get('X-Auth-Token');

  if (!token) {
      return res.send({valid: false});
  }

  return jwt.verify(token as string, "secretkey", (err: unknown, decoded) => {
      if (err) {
          return res.send({valid: false});
      }
      res.send({valid: true});
  });
})
authRouter.get('/token/me', (req, res) => {
  // check header for the token
  const token = req.get('X-Auth-Token');

  // decode token
  if (token) {
    return jwt.verify(token as string, "secretkey", (err: unknown, decoded) => {
      if (err) {
        return res.status(500).send({error: 'Failed to authenticate token.' });
      }
      res.send({id: 0, first_name: "Danila", last_name: "Bratushka", phone_number: '8-800-555-35-35', email: (decoded as unknown as {email: string}).email});
    });
  }

  // if there is no token, return error
  res.status(403).send({
      error: 'No token provided.'
  });
})

export {authRouter}
