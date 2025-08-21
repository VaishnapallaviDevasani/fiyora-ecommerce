import userModel from "../models/userModel.js";

//add products to user cart
const addToCart =async(req,res)=>{
  console.log("Received body:", req.body);
    try{
        const {itemId , size} =req.body
        const userId = req.user.id; // ✅ from middleware
        const userData=await userModel.findById(userId)
        if (!userData) {
    return res.status(404).json({ success: false, message: "User not found" });
}
let cartData = userData.cartData || {};
        // let cartData =await userData.cartData;
        // if (!user) {
        //     return res.status(404).json({ success: false, message: "User not found" });
        // }
        // let cartData = user.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true ,message:"Added to Cart"})
    }catch(error){
        console.log(error)
        res.json({success:false ,message:error.message})
    }
}
//update user cart
const updateCart =async(req,res)=>{
    try{
        const {userId,itemId,size,quantity}=req.body
        const userData =await userModel.findById(userId)
        let cartData =await userData.cartData;

        cartData[itemId][size]=quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true ,message:"Cart updated"})

    }catch(error){
        console.log(error)
        res.json({success:false ,message:error.message})
    }
}
//get user cart data
const getUserCart =async(req,res)=>{
    try{
        const {userId} =req.body
        console.log("Looking for user:", userId);
        const userData =await userModel.findById(userId)
        let cartData =await userData.cartData;

        res.json({success:true,cartData});

    }catch(error){
        console.log(error)
        res.json({success:false ,message:error.message})
    }
}

export { addToCart, getUserCart, updateCart };


