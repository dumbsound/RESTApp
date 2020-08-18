const express=require('express');
const app=express();
const db=require('./models')

app.use(express.json());

db.sequelize.sync().then(()=>{
    app.listen(PORT,console.log(`Server is running on port ${PORT}`));
});

const PORT=process.env.PORT||5000;

const api=require('./api/apiRoutes');
app.use('/api',api);



