import jwt from 'jsonwebtoken';

const authUser =async(req, res,next)=>{
    const {token} =req.headers;
    
    if(!token){
        return res.json({success:false , message:'Not Authorized Login Again'})
    }
    try{
        const token_decode =jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId =token_decode.id
        console.log("Decoded:", token_decode);
        // console.log("User from DB:", user);
        req.user = token_decode;
        console.log("Token received:", req.headers.token);
        // const user = await User.findById(token_decode.id);
        // if (!user) return res.status(404).json({ message: "User not found" });
        // req.user = user;
        next()
    }catch(error){
        console.log(error)
        res.json({success:false ,message:error.message})
    }
}
export default authUser
// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.json({ success: false, message: 'Not Authorized Login Again' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         // req.body.userId = token_decode._id;
//         req.userId = token_decode._id;

//         console.log("Token received:", token);
//         console.log("Decoded Token:", token_decode);

//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export default authUser;
