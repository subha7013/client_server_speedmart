import Order from "../models/Order.js";

/* ================= GET ORDERS ================= */
export const getOrders = async (req,res)=>{
 try{

  const { date } = req.query;

  let filter = {};

  if(date){
   const start = new Date(date);
   const end = new Date(date);
   end.setDate(end.getDate()+1);

   filter.createdAt = { $gte:start, $lt:end };
  }

  const orders = await Order.find(filter)
   .sort({ createdAt:-1 });

  res.json(orders);

 }catch(err){
  res.status(500).json({ msg:"Error fetching orders" });
 }
};

/* ================= MARK DELIVERED ================= */
export const markDelivered = async (req,res)=>{
 try{

  const order = await Order.findByIdAndUpdate(
   req.params.id,
   { status:"DELIVERED" },
   { new:true }
  );

  res.json(order);

 }catch(err){
  res.status(500).json({ msg:"Update failed" });
 }
};
