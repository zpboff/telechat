import { Http2ServerRequest } from "http2";

const getTokenFromHeader = (req: Http2ServerRequest) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}