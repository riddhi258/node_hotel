const express= require('express');
const router = express.Router();
const menuItem = require('../models/menuItem');


router.post('/',async (req,res)=>{
    try{
      const data= req.body// assuming the request body contians person data
  
      //create new  mongoose model using person document 
      const newMenuItem =new menuItem(data);
    
      const response = await newMenuItem.save();
      console.log('data saved')
      res.status(200).json(response);
    } catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
    }
    
  })
  
  router.get('/',async(req,res)=>{
    try{
        const data= await menuItem.findOne();
        console.log('data fetched')
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
    }
  })

  router.get('/:tasteType',async(req,res)=>{
    try{
       const tasteType= req.params.tasteType;// extract work type form url parameter
      if(tasteType=='sweet'||tasteType== 'sour'|| tasteType=='spicy'){
  
        const response= await menuItem.find({ taste : tasteType });
        console.log('response fetched');
        res.status(200).json(response);        
      }else{
          res.status(404).json({err:"invalid tasteType"})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
    }
  })
  router.put('/:id',async(req,res)=>{
    try{
     const menuitemId=req.params.id;
     const upadatedmenuitemData=req.body;
     const response =await menuItem.findByIdAndUpdate(menuitemId, upadatedmenuitemData,{
         new:true,
         runVAlidator:true   
     })
      if(!response){
         return res.status(404).json({error : 'menuitem not found'}),
          console.log('menuitem not found');
       
      }
 
     console.log('data is upadated');
     res.status(200).json(response);
    }
    catch(err){
     console.log(err);
     res.status(500).json({err:'internal server error'})
    }
     
   })
   router.delete('/:id',async(req,res)=>{
     try{
      const menuitemId=req.params.id;
     
      const response =await menuItem.findByIdAndDelete(menuitemId)
       if(!response){
          return res.status(404).json({error : 'menuitem not found'}),
          console.log('menuitem not found');
       }
  
      console.log('data is deleted sucessfully');
      res.status(200).json({message:'data is deleted sucessfully'});
     }
     catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
     }
      
    })

  module.exports=router;