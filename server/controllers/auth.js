import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import user from "../models/User.js";

//Register user
export const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        //Проверка на занятость для этого константа
        const isUsed = await User.findOne({username});

        if (isUsed) {
            return res.json({
                message: 'Данный username занят'
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({
            username,
            password: hash
        })
        await newUser.save()
        res.json({
            newUser,
            message: 'Регистрация прошла успешно'
        })
    } catch (e) {
        res.json({
            message: 'Ошибка при создании пользователя'
        })

    }
}
//Login user
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует'
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({message: 'Не верный пароль'})
        }
    } catch (e) {
        res.json({
            message: 'Неправельный пароль'
        })
    }
    const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
        {expiresIn: "30d"}
    )
    res.json({
        token,user,
        message: 'Вы вошли в систему'
    })

}
//Ger me
export const getMe = async (req, res) => {
    try {
        const user =await User.findById(req.userId)
        if(user){
            const token = jwt.sign({
                    id: user._id,
                }, process.env.JWT_SECRET,
                {expiresIn: "30d"}
            )
            res.json({
                token,user,
                message: 'Вы вошли в систему'
            })
        }

    } catch (e) {
        res.json({
            message: 'Ошибка доступа(токен)'
        })
    }
}
