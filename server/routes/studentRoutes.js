const express=require('express');
const router=express.Router();


const{createStudent}=require('../controllers/studentController');
const protect=require('../middleware/authMiddleware');
const authorize=require('../middleware/authorize');



router.post('/create',protect,authorize('student'),createStudent);

module.exports=router;