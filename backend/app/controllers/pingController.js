import User from "../models/user.models.js";

const pingController = async (req, res) => {
    try {
        const results = await User.findAll();
        console.log(results);
        res.json(results);
    } catch (error) {
        console.log(error);
    }
};

export default pingController;