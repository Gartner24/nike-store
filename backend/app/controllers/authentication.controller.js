import jwt from 'jsonwebtoken';

const loginController = async (req, res) => {
    return res.send(
        jwt.sign({test: 'payload'}, 'secretKey', {expiresIn: '1h'})
    );
}

export default loginController;
