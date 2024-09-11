const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

//ADD EXPENSE

router.post("/" , async(req ,res)=>{
    try {
        const newExpense = await Expense(req.body);
        const expense = newExpense.save();
        res.status(201).json(expense);

        
    } catch (error) {
        res.status(500).json(error);
        
    }

    
})

// Get all expenses

router.get("/" , async(req ,res)=>{
    try {
        const expenses = await Expense.find().sort({crearedAt:-1});
        res.status(200).json(expenses);
        //change krr dena agar required ho-->  res.status(200).json(expenses);
        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

//Update Expense

router.put("/:id" , async(req ,res)=>{
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            {new : true}
        );
        res.status(201).json(expense);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
    
});

//Delete Expense
router.delete("/:id" , async(req ,res)=>{
    try {
        await Expense.findByIdDelete(req.params.id);
        res.status(200).json("Expense has been successfully deleted");
        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
    
});

module.exports = router;