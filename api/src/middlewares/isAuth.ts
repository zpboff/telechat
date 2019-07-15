import * as jwt from 'express-jwt';

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

export default jwt({
  secret: 'MySuP3R_z3kr3t', // Has to be the same that we used to sign the JWT

  userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken -> 'req.token'

  getToken: getTokenFromHeader, // A function to get the auth token from the request
})