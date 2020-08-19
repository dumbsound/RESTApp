const db = require("../models/");
const winston = require('winston');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const external=require('./external');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({level:'info'}),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  const errorLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({level:'error'}),
      new winston.transports.File({ filename: 'error.log' })
    ]
  });

exports.run = async(req,res)=>{
    res.status(200).json({message:'Testing! Controller Module'})
}

exports.getId= async (req, res) => {
    try {
      let results = await db.Teacher.findAll({
        where: {
          teacherId: req.params.id
        }
      })
      res.status(200).send(results);
      if(results!=0){
        logger.log({
          level: 'info',
          message: 'Get - based on id'
        });
      }else{
        logger.log({
          level: 'error',
          message: 'Get/id - id not found'
        });
      }
    }
    catch (err) {
      errorLogger.log({
        level: 'error',
        message: 'GET- id does not exist'
      });
        return res.status(400).json({message:"ID not found"})
    }
    
  };

  exports.getAll= async (req, res) => {
    try {
      let results = await db.Teacher.findAndCountAll({})
      res.status(200).send(results)
      if(results!=0){
        logger.log({
          level: 'info',
          message: 'GET - all'
        });
      }else{
        logger.log({
          level: 'error',
          message: 'GET/all - no entry in database'
        });
      }
    }
    catch (err) {
      res.status(400).json({ message: "Error" })
    }
  };

  exports.newEntry= async (req, res) => {
    try {
      let results = await db.Teacher.create({
        teacherEmail: "tan.k.k@moe.gov.sg",
        teacherName: "Tan Kah Khee",
        toDelete: '1'
      },
        db.Class.create({
          className:'Computational Algorithm',
          classCode:'ENG231'
        }, 
          db.Subject.create({
          subjectCode:'CSS13',
          subjectName:'Introduction to Electronics'
        }))
      );
      res.status(200).json(results).send({ message: "Successfully Updated" });
      logger.log({
        level: 'info',
        message: 'Updated id'
      });
    }
    catch (err) {
        res.status(500);
    }
    
  };

  exports.delete = async (req, res) => {
    try {
      let results = await db.Teacher.destroy({
        where: {
          teacherId: req.params.id
        }
      })
      res.status(200).json(results);
      logger.log({
        level: 'info',
        message: 'DELETE/id '
      })
    }
    catch (err) {
     return   res.status(400).json({ message: "Error" })
    }
  };

  //Question 2
  exports.studentData= async (req, res) => {
    try {
      let results = await db.Student.findAndCountAll({
        where: {
          classCode: req.query.classCode
        },
        attributes: [
          "id", 
          "studentName",
          "studentEmail",
        ]
      },
        { 
          offset: req.query.offset,
          limit: req.query.limit,
  
        }
        )
      data = {};
      data.count = results.count;
      data.students = results.rows;
      if (data.count === 0) {
        res.status(400).send();
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      res.status(500).json({ message: "Error" })
    }
  };

  const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='text/csv')
        cb(null,true);
    else{
        cb(new Error('message not in correct format'),false);
    }
}

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  exports.uploadFile= async (req, res, next) => {
    fs.createReadStream(req.file.path).pipe(csv({}))
      .on('data', async (data) => {
        try {
          let results= await db.Teacher.create({
            teacherEmail: data.teacherEmail,
            teacherName: data.teacherName,
            toDelete: data.toDelete
          }, db.Student.create({
            studentName: data.studentName,
            studentEmail: data.studentEmail
          }, db.Subject.create({
            subjectCode: data.subjectCode,
            subjectName: data.subjectName
          }, db.Class.create({
            classCode: data.classCode,
            className: data.className
          }))));
        }
        catch (err) {
          res.status(400).send({message: "Error!"});
        }
      })
      .on('end', () => {
      });
    res.status(200).send("File Uploaded!");
      logger.log({
        level: 'info',
        message: 'File Uploaded!'
      });
  };

  //Question 3
 exports.updateClassName= async (req, res) => {
    try {
      let results = await db.Class.update({
        className: req.body.className,
      },
        {
          where: { classCode: req.params.classCode }
        }
      )
      res.status(200).json(results)
      if(results!=0){
        logger.log({
          level: 'info',
        message: 'Updated class name'
        })
      }else{
        logger.log({
          level: 'error',
        message: 'class code not found'
        })
      }
    }
    catch (err) {
      res.status(400).json({ message: "Error" })
      errorLogger.log({
        level: 'error',
        message: 'Updated class name error'
      })
    }
  };

  //Question 4
exports.getReport= async (req, res) => {
    try {
      let results = await db.Teacher.findAll({
        attributes: [
            "teacherName"
          ],
          include:[db.Subject]
      })
      // data = {};
      // data.teacher=results;
      res.status(200).json(results);
  
    } catch (err) {
      res.status(500).json({ message: "Error" })
    }
  };
