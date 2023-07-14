import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

const loginRouter = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const token = jwt.sign({ username }, "Stack", {
        expiresIn: '40m'
      });
      res.send({ token });
    } else {
      console.log('wrong user');
      res.send({ message: 'wrong user' });
    }
  } catch (error) {
    console.log(error);
  }
};

export default loginRouter;