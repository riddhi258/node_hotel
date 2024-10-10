const express= require('express');
const router = express.Router();
const Person = require('../models/person');
const MenuItem = require('../models/menuItem');


router.post('/',async (req,res)=>{
    try{
      const data= req.body// assuming the request body contians person data
  
      //create new  mongoose model using person document 
      const newPerson =new Person(data);
    
      const response = await newPerson.save();
      console.log('data saved')
      res.status(200).json(response);
    } catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
    }
    
  })
  
  router.get('/',async(req,res)=>{
    try{
        const data= await Person.findOne();
        console.log('data fetched')
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
    }
  })
  router.get('/:workType',async(req,res)=>{
    try{
       const workType= req.params.workType;// extract work type form url parameter
      if(workType=='chef'||workType== 'manager'||workType=='waiter'){
  
        const response= await Person.find({ work : workType });
        console.log('response fetched');
        res.status(200).json(response);        
      }else{
          res.status(404).json({err:"invalid worktype"})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({err:'internal server error'})
    }
  })

  router.put('/:id',async(req,res)=>{
   try{
    const personId=req.params.id;
    const upadatedPersonData=req.body;
    const response =await Person.findByIdAndUpdate(personId,upadatedPersonData,{
        new:true,
        runVAlidator:true   
    })
     if(!response){
        return res.status(404).json({error : 'person not found'}),
        console.log('person not found');
     }

    console.log('persondata is upadated');
    res.status(200).json(response);
   }
   catch(err){
    console.log(err);
    res.status(500).json({err:'internal server error'})
   }
    
  })
  router.delete('/:id',async(req,res)=>{
    try{
     const personId=req.params.id;
    
     const response =await Person.findByIdAndDelete(personId)
      if(!response){
         return res.status(404).json({error : 'person not found'}),
         console.log('person not found');
      }
 
     console.log('persondata is deleted sucessfully');
     res.status(200).json({message:'persondata is deleted sucessfully'});
    }
    catch(err){
     console.log(err);
     res.status(500).json({err:'internal server error'})
    }
     
   })
  module.exports =router;