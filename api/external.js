const axios=require('axios');

module.exports=async function getRequest() {

    let res = axios.get('http://localhost:8080/students',{
  
      params:{
        classCode:req.params.class,
        offset:req.params.limit,
        limit:req.params.limit
      }
    });
  
    let data = res.data;
    console.log(data);
  }