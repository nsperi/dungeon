import jwt from "jsonwebtoken";

const createToken = (data) =>{
    const opts = { expiresIn: 10 };
    const token = jwt.sign(data, process.env.SECRET_JWT);
    return token;
}

const verifyToken = (token) => {
    const data = jwt.verify(token, process.env.SECRET_JWT);
    return data;
}

export { createToken, verifyToken };