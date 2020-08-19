const express = require('express');
const router = express.Router();
const multer = require('multer');
const posts = require("./controller.js");
const axios=require('axios');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', posts.run);

router.get('/upload/:id',posts.getId);

router.get('/all', posts.getAll);

router.post("/upload/new", posts.newEntry);

router.delete("/upload/:id", posts.delete);

router.get('/class/:classCode', posts.studentData);

router.post('/upload', upload.single('file'), posts.uploadFile);

//Question 3
router.put('/class/:classCode', posts.updateClassName);

//Question 4
router.get('/reports/workload', posts.getReport);

// module.exports=async function getRequest() {

//   let res = axios.get('http://localhost:8080/students',{

//     params:{
//       classCode:req.params.class,
//       offset:req.params.limit,
//       limit:req.params.limit
//     }
//   });

//   let data = res.data;
//   console.log(data);
// }

module.exports = router; 