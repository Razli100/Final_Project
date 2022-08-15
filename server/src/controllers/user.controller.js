import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";

export const CreatNewUser = async(req,res) => {
    const userData = req.body;

    const user = new User(userData);
    const cart = new Cart({ownerID:user._id})
    console.log(user);

    try {
        const token = await user.genAuthToken();

        await user.save();
        await cart.save();

        res.status(201).send({
            status:201,
            stauseText:'Created',
            data:{user:user, token:token},
            message:'User was created!'
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status:400,
            statusText:'Bad Request',
            message:'',
        })
    }
};

export const userLogin = async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            throw new Error();

        };

        const user = await User.findUserByEmailAndPassword(email, password);
        const token = await user.genAuthToken();

        res.send({
            status:200,
            statusText: 'OK',
            data: {user:user, token:token},
            message: 'User was loged in successfully',
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status:400,
            statusText:'Bad request',
            message:'',
        });
}};

export const userLogout = async(req,res) => {
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter((tokenDoc) => tokenDoc.token !== token);
        await user.save();

        res.send({
            status:200,
            statusText:'OK',
            data:{},
            message:'The user was logged out successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:500,
            statusText:"Internal server error",
            message:'',
        })
    }
}