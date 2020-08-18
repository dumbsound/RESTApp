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
          id: req.params.id
        }
      })
      res.status(200).send(results);
      logger.log({
        level: 'info',
        message: 'Get - based on id'
      });
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
      logger.log({
        level: 'info',
        message: 'GET - all'
      });
    }
    catch (err) {
      res.status(400).json({ message: "Error" })
    }
  };

  exports.uploadById= async (req, res) => {
    try {
      let results = db.Teacher.create({
        teacherId:'6',
        teacherEmail: "Yaacob.K@moe.gov.sg",
        teacherName: "Yaacob Kassim",
        toDelete: '1'
      },
        db.Class.create({
          classId:'8',
          className:'Data Science',
          classCode:'ENG101'
        }, 
          db.Subject.create({
          subjectId:'7',
          subjectCode:'EE43',
          subjectName:'Electrical Motors'
        }))
      )
      res.status(200).json(results)
      .send({ message: "Successfully Updated" })
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
          classCode: req.query.class
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
  
        })
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
    let results = fs.createReadStream(req.file.path).pipe(csv({}))
      .on('data', (data) => {
        try {
          db.Teacher.create({
            teacherEmail: data.teacherEmail,
            teacherName: data.teacherName,
            toDelete: data.toDelete
          },
            db.Student.create({
              studentName:data.studentName,
              studentEmail:data.studentEmail
            },
              db.Subject.create({
                subjectCode:data.subjectCode,
                sujectName:data.sujectName
              },
                db.Class.create({
                  classCode:data.classCode,
                  className:data.className
                })
              )
            )
          )
        } catch (err) {
          res.status(400).send({
            message: "Error!"
          })
        }
      })
      .on('end', () => {
      });
    // console.log(req.file);
    res.status(200).send("File Uploaded!");
  
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
      let results = await db.Admin.findAll({
        attributes: [
            "subjectCode",
            "studentName",
            "classCode",
          ]
      })
      res.status(200).json(results);
  
    } catch (err) {
      res.status(500).json({ message: "Error" })
    }
  };
