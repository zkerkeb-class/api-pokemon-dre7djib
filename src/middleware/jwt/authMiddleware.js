import { expressjwt } from 'express-jwt';

function verifyJwt(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })(req, res, next);
}
export default verifyJwt;