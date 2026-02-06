import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req,res)=>{
 try{

  const { email,password } = req.body;

  const admin = await Admin.findOne({ email });

  if(!admin){
   return res.status(401).json({ msg:"Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.password);

  if(!match){
   return res.status(401).json({ msg:"Invalid credentials" });
  }

  const token = jwt.sign(
   { id:admin._id, role:"admin" },
   process.env.JWT_SECRET,
   { expiresIn:"1d" }
  );

  res.json({ token });

 }catch(err){
  res.status(500).json({ msg:"Server error" });
 }
};
