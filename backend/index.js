const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const mysql = require('mysql2');
const fs = require('fs').promises;
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { strict } = require('assert');
const app = express();

//MIDDLEWARES    
    app.use(cors({
        credentials:true,
        origin:['http://localhost:4200']
    }));
    app.use(bodyparser.json());
    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(express.json());


//Authentication Middleware using JWT

    

//DATABASE CONNECTION

    const db = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'ayunledesma',
        port:3306
    });

//CHECK DATABASE CONNECTION

    db.connect(err=>{
        if (err) {console.log(err,'dberr');}
        console.log('Database connected...');
    },{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

//ROUTE FOR IMAGES

    app.use('/uploads', express.static(path.join(__dirname,'uploads')));
    app.use('/uploadsDOC', express.static(path.join(__dirname,'uploadsDOC')));

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const regex = new RegExp("(?:\.pdf|\.docx|\.doc)$");
            if (regex.test(path.extname(file.originalname))) {
                cb(null, './uploadsDOC')
            }else{
                cb(null, './uploads')
            }
        },
        filename: function (req, file, cb) {
            const regex = new RegExp("(?:\.pdf|\.docx|\.doc)$");
            if (regex.test(path.extname(file.originalname))) {
                cb(null, `document${Math.floor(Math.random()* (100-0))}-${Date.now()}${path.extname(file.originalname)}`)
            }else{
                cb(null, `${file.fieldname}${Math.floor(Math.random()* (100-0))}-${Date.now()}${path.extname(file.originalname)}`)
            }
        }
      })
      
      const upload = multer({ storage })

//ROUTES

    //...................................TABLE:USERS..................................................

        //get all users
            app.get('/user',(_req,res)=>{
                //console.log('get users');
                let qr = `select * from user`;
                db.query(qr,(err,result)=>{
                    if(err)
                    {
                        console.log(err,'errs');
                    }
                    if(result.length>0)
                    {
                        res.send({
                            message:'all user data',
                            data:result
                        });
                    }
                });
            });
            
        //get single user
            app.get('/user/:id',(req,res)=>{
                //console.log('get single data');
                //console.log(req.params.id,'get id==>');
                let gID = req.params.id;
                let qr = `select * from user where id = ${gID}`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}

                    if(result.length>0)
                    {
                        res.send({
                            message:'get single data',
                            data:result
                        });
                    }else
                    {
                        res.send({
                            message:'data not found'
                        });
                    }
                });
            });

        //login user
            app.post('/login',async(req,res)=>{
                let userName = req.body.username;
                let pw = req.body.password;
                let qr = `select * from user where username = '${userName}'`;
                db.query(qr,async(err,result)=>{
                    if(err || result.length === 0) {
                        console.log("Error Searching for username: " + err);
                        res.status(404).json({message: "No username found" })
                    }else{
                        //compare hashed password
                        const match = await bcrypt.compare(pw, result[0].password);
                        if(match)
                        {
                            //create a jwt token
                            const token = jwt.sign({userId: result[0].id}, 'my_secret_key', {expiresIn: '1h'});
                            res.cookie('jwt' , token , { httpOnly: true ,  maxAge: 1*60*60*1000 });
                            res.send({message:"success"});
                            //res.json({ message: 'Login Successful', token, userName});
                        }else
                        {
                            res.status(404).json({message: 'Invalid password'})
                        }
                    }
                });
            });
        

        //profile user
            app.get('/profile', async(req,res)=>{
                try{                
                    const cookie = req.cookies['jwt'];
                    const claims = jwt.verify(cookie,'my_secret_key');
                    //console.log(claims, 'get cookie=>');
                    if(!claims){
                        return res.status(401).send({
                            message:"User unauthenticated1"
                        })                    
                    }

                    let qr = `select * from user where id = '${claims.userId}'`;
                    db.query(qr, (err,result)=>{
                        if(err || result.length === 0) {
                            res.status(500).json({message: "Error Fetching Details" })
                        }else{
                            res.json({
                                username : result[0].username,
                                email : result[0].email,
                                id : result[0].id
                            });
                        }
                    });
                }
                catch(error){
                    return res.status(401).send({
                        message: "User unauthenticated2"
                    })
                }

            });
        
        //logout
            app.post('/logout',(req,res)=>{
                res.cookie('jwt','',{maxAge : 0});
                res.send({message: "success"});
            })

        //create user
            app.post('/user',async (req,res)=>{
                //console.log('postdata');
                //console.log(req.body,'createdata');
                let userName = req.body.username;
                let eMail = req.body.email;
                let pw = req.body.password;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pw, salt);
                tzoffset = (new Date()).getTimezoneOffset() * 60000;
                let creationdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
                let qr = `insert into user(username,email,password,creationdate) values('${userName}','${eMail}','${hashedPassword}','${creationdate}')`;
                db.query(qr,(err,result)=>{
                    if(err) 
                    {
                        console.log(err);
                        res.send({
                            message1:'El ussuario ya existe'
                        });
                        return;
                    }
                    console.log(result,'result');
                    res.send({
                        message2:'El usuario ha sido creado con exito'
                    });
                    return;
                });
                
            });

        //update user
            app.put('/user/:id',(req,res)=>{
                //console.log('putdata');
                //console.log(req.body,'updatedata');
                let gID = req.params.id;
                let userName = req.body.username;
                let eMail = req.body.email;
                let pw = req.body.password;
                let qr = `update user set username = '${userName}', email = '${eMail}', password = '${pw}' where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        res.send({
                            message1:'El ussuario ya existe'
                        });
                        return;
                    }
                    res.send({
                        message2:'El usuario ha sido actualizado'
                    });
                    return;
                });
            });

        //delete single user
            app.delete('/user/:id',(req,res)=>{
                let qID = req.params.id;
                let qr = `delete from user where id = '${qID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'data deleted'
                    });
                });
            });


    //...................................TABLE:ASOC..................................................

            //get all associations
            app.get('/associations',(_req,res)=>{
                //console.log('get associations');
                let qr = `select * from associations`;
                db.query(qr,(err,result)=>{
                    if(err)
                    {
                        console.log(err,'errs');
                    }
                    if(result.length>0)
                    {
                        res.send({
                            message:'all associations data',
                            data:result
                        });
                    }
                });
            });
            
        //get single associations
            app.get('/associations/:id',(req,res)=>{
                //console.log('get single data');
                //console.log(req.params.id,'get id==>');
                let gID = req.params.id;
                let qr = `select * from associations where  id = ${gID}`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
        
                    if(result.length>0)
                    {
                        res.send({
                            message:'get single data',
                            data:result
                        });
                    }else
                    {
                        res.send({
                            message:'data not found'
                        });
                    }
                });
            });
        
        //create associations
            app.post('/associations',upload.single('image'),(req,res)=>{
                //console.log(req.body,'createdata');
                let gtitle = req.body.title;
                let image = req.file;
                let pathImage = image.destination+'/'+image.filename;
                let gdescription = req.body.description;
                let gcontactinf = req.body.contactinf;
                let glocation = req.body.location;
                tzoffset = (new Date()).getTimezoneOffset() * 60000;
                let creationdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
        
                let qr = `insert into associations(title,description,contactinf,location,image,creationdate) values('${gtitle}','${gdescription}','${gcontactinf}','${glocation}','${pathImage}','${creationdate}')`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    console.log(result,'result');
                    res.send({
                        message:'associations created',
                    });
                });
                
            });
        
        //update associations
            app.put('/associations/:id',upload.single('image'),(req,res)=>{
                //console.log('putdata');
                //console.log(req.body,'updatedata');
                let gID = req.params.id;
                let gtitle = req.body.title;
                let gdescription = req.body.description;
                let gcontactinf = req.body.contactinf;
                let glocation = req.body.location;
                let image = '';
                if(req.file){
                    image = req.file;
                    deleteFileA(gID);
                    pathImage = image.destination+'/'+image.filename;
                }else{
                    pathImage = req.body.image;                 
                }
        
        
                let qr = `update associations set title = '${gtitle}', description = '${gdescription}', contactinf = '${gcontactinf}', location = '${glocation}',  image = '${pathImage}' where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'Asociaciones ha sido actualizado'
                    });
                });
            });
        
        //delete single associations
            app.delete('/associations/:id',(req,res)=>{
                let gID = req.params.id;
                deleteFileA(gID);
                let qr = `delete from associations where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'data deleted'
                    });
                });
            });
        
            function deleteFileA(gID) {
        
                let qr = `select * from associations where id = ${gID}`;
                db.query(qr,(err, result) => {
                    [{image}] = result;
                    fs.unlink(path.resolve(image)).then(() => {
                        console.log('image deleted');
                    }).catch(err => { console.error('image does not exist') })
                });
            }

    //...................................TABLE:GREETINGS..................................................
        //get all greetings
        app.get('/greetings',(_req,res)=>{
            //console.log('get greetings');
            let qr = `select * from greetings`;
            db.query(qr,(err,result)=>{
                if(err)
                {
                    console.log(err,'errs');
                }
                if(result.length>0)
                {
                    res.send({
                        message:'all greetings data',
                        data:result
                    });
                }
            });
        });
        
    //get single greetings
        app.get('/greetings/:id',(req,res)=>{
            //console.log('get single data');
            //console.log(req.params.id,'get id==>');
            let gID = req.params.id;
            let qr = `select * from greetings where  id = ${gID}`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
    
                if(result.length>0)
                {
                    res.send({
                        message:'get single data',
                        data:result
                    });
                }else
                {
                    res.send({
                        message:'data not found'
                    });
                }
            });
        });
    
    //create greetings
        app.post('/greetings',upload.single('image'),(req,res)=>{
            //console.log(req.body,'createdata');
            let gtitle = req.body.title;
            let image = req.file;
            let pathImage = image.destination+'/'+image.filename;
            let gdescription = req.body.description;
    
            let qr = `insert into greetings(title,description,image) values('${gtitle}','${gdescription}','${pathImage}')`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                console.log(result,'result');
                res.send({
                    message:'greetings created',
                });
            });
            
        });
    
    //update greetings
        app.put('/greetings/:id',upload.single('image'),(req,res)=>{
            //console.log('putdata');
            //console.log(req.body,'updatedata');
            let gID = req.params.id;
            let gtitle = req.body.title;
            let gdescription = req.body.description;
            let image = '';
            if(req.file){
                image = req.file;
                deleteFileG(gID);
                pathImage = image.destination+'/'+image.filename;
            }else{
                pathImage = req.body.image;                 
            }
    
    
            let qr = `update greetings set title = '${gtitle}', description = '${gdescription}',  image = '${pathImage}' where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'Otros servicios publicos ha sido actualizado'
                });
            });
        });
    
    //delete single greetings
        app.delete('/greetings/:id',(req,res)=>{
            let gID = req.params.id;
            deleteFileG(gID);
            let qr = `delete from greetings where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'data deleted'
                });
            });
        });
    
        function deleteFileG(gID) {
    
            let qr = `select * from greetings where id = ${gID}`;
            db.query(qr,(err, result) => {
                [{image}] = result;
                fs.unlink(path.resolve(image)).then(() => {
                    console.log('image deleted');
                }).catch(err => { console.error('image does not exist') })
            });
        }

        //...................................TABLE:POLITICAL PARTY..................................................
        //get all politicalparty
        app.get('/politicalparty',(_req,res)=>{
            //console.log('get politicalparty');
            let qr = `select * from politicalparty`;
            db.query(qr,(err,result)=>{
                if(err)
                {
                    console.log(err,'errs');
                }
                if(result.length>0)
                {
                    res.send({
                        message:'all political party data',
                        data:result
                    });
                }
            });
        });
        
        //get single politicalparty
        app.get('/politicalparty/:id',(req,res)=>{
            //console.log('get single data');
            //console.log(req.params.id,'get id==>');
            let gID = req.params.id;
            let qr = `select * from politicalparty where  id = ${gID}`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
    
                if(result.length>0)
                {
                    res.send({
                        message:'get single data',
                        data:result
                    });
                }else
                {
                    res.send({
                        message:'data not found'
                    });
                }
            });
        });
    
        //create politicalparty
        app.post('/politicalparty',(req,res)=>{
            //console.log(req.body,'createdata');
            let gtitle = req.body.title;
            let gorden = req.body.orden;
    
            let qr = `insert into politicalparty(title,description) values('${gtitle}','${gorden}')`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                console.log(result,'result');
                res.send({
                    message:'politicalparty created',
                });
            });
            
        });
    
        //update politicalparty
        app.put('/politicalparty/:id',(req,res)=>{
            //console.log('putdata');
            //console.log(req.body,'updatedata');
            let gID = req.params.id;
            let gtitle = req.body.title;
            let gorden = req.body.orden;
            let qr = `update politicalparty set title = '${gtitle}', orden = '${gorden}' where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'Otros politicalparty ha sido actualizado'
                });
            });
        });
    
        //INTERCAMBIAR ORDEN ENTRE DOS NUMEROS
        //UPDATE `politicalparty` AS o 
        //INNER JOIN (SELECT `id`, `orden` FROM `politicalparty` 
        //WHERE `id` IN (1,2)) 
        //AS t ON o.`id` <> t.`id` 
        //SET o.`orden` = t.`orden` 
        //WHERE o.`id` IN (1,2)


        //delete single politicalparty
        app.delete('/politicalparty/:id',(req,res)=>{
            let gID = req.params.id;
            let qr = `delete from politicalparty where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'data deleted'
                });
            });
        });


    //...................................TABLE:MUNICIPAL_CORPORATION..................................................
        //get all municipal_corporation
        app.get('/municipal_corporation',(_req,res)=>{
            //console.log('get municipal_corporation');
            let qr = `select * from municipal_corporation`;
            db.query(qr,(err,result)=>{
                if(err)
                {
                    console.log(err,'errs');
                }
                if(result.length>0)
                {
                    res.send({
                        message:'all municipal_corporation data',
                        data:result
                    });
                }
            });
        });
        
    //get single municipal_corporation
        app.get('/municipal_corporation/:id',(req,res)=>{
            //console.log('get single data');
            //console.log(req.params.id,'get id==>');
            let gID = req.params.id;
            let qr = `select * from municipal_corporation where  id = ${gID}`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
    
                if(result.length>0)
                {
                    res.send({
                        message:'get single data',
                        data:result
                    });
                }else
                {
                    res.send({
                        message:'data not found'
                    });
                }
            });
        });
    
    //create municipal_corporation
        app.post('/municipal_corporation',upload.single('image'),(req,res)=>{
            //console.log(req.body,'createdata');
            let gpoliticalParty = req.body.politicalParty;
            let gfullname = req.body.fullname;
            let gpoliticalOffice = req.body.politicalOffice;
            let image = req.file;
            let pathImage = image.destination+'/'+image.filename;
            let gemail = req.body.email;
    
            let qr = `insert into municipal_corporation(politicalParty,fullname,politicalOffice,email,image) values('${gpoliticalParty}','${gfullname}','${gpoliticalOffice}','${gemail}','${pathImage}')`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                console.log(result,'result');
                res.send({
                    message:'municipal_corporation created',
                });
            });
            
        });
    
    //update municipal_corporation
        app.put('/municipal_corporation/:id',upload.single('image'),(req,res)=>{
            //console.log('putdata');
            //console.log(req.body,'updatedata');
            let gID = req.params.id;
            let gpoliticalParty = req.body.politicalParty;
            let gfullname = req.body.fullname;
            let gpoliticalOffice = req.body.politicalOffice;
            let gemail = req.body.email;        
            let image = '';
            if(req.file){
                image = req.file;
                deleteFileMC(gID);
                pathImage = image.destination+'/'+image.filename;
            }else{
                pathImage = req.body.image;                 
            }
    
    
            let qr = `update municipal_corporation set politicalParty = '${gpoliticalParty}',  fullname = '${gfullname}',  politicalOffice = '${gpoliticalOffice}', email = '${gemail}',  image = '${pathImage}' where id = '${gID}'`;
            console.log('ESto es la qr->',qr)
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'Municipal Corporation publicos ha sido actualizado'
                });
            });
        });
    
    //delete single municipal_corporation
        app.delete('/municipal_corporation/:id',(req,res)=>{
            let gID = req.params.id;
            deleteFileMC(gID);
            let qr = `delete from municipal_corporation where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'data deleted'
                });
            });
        });
    
        function deleteFileMC(gID) {
    
            let qr = `select * from municipal_corporation where id = ${gID}`;
            db.query(qr,(err, result) => {
                [{image}] = result;
                fs.unlink(path.resolve(image)).then(() => {
                    console.log('image deleted');
                }).catch(err => { console.error('image does not exist') })
            });
        }

    //...................................TABLE:OTROSERV..................................................

        //get all other_services
        app.get('/other_services',(_req,res)=>{
            //console.log('get other_services');
            let qr = `select * from other_services`;
            db.query(qr,(err,result)=>{
                if(err)
                {
                    console.log(err,'errs');
                }
                if(result.length>0)
                {
                    res.send({
                        message:'all other_services data',
                        data:result
                    });
                }
            });
        });
        
    //get single other_services
        app.get('/other_services/:id',(req,res)=>{
            //console.log('get single data');
            //console.log(req.params.id,'get id==>');
            let gID = req.params.id;
            let qr = `select * from other_services where  id = ${gID}`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
    
                if(result.length>0)
                {
                    res.send({
                        message:'get single data',
                        data:result
                    });
                }else
                {
                    res.send({
                        message:'data not found'
                    });
                }
            });
        });
    
    //create other_services
        app.post('/other_services',upload.single('image'),(req,res)=>{
            //console.log(req.body,'createdata');
            let gtitle = req.body.title;
            let image = req.file;
            let pathImage = image.destination+'/'+image.filename;
            let gdescription = req.body.description;
            let gcontactinf = req.body.contactinf;
            let glocation = req.body.location;
            tzoffset = (new Date()).getTimezoneOffset() * 60000;
            let creationdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
    
            let qr = `insert into other_services(title,description,contactinf,location,image,creationdate) values('${gtitle}','${gdescription}','${gcontactinf}','${glocation}','${pathImage}','${creationdate}')`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                console.log(result,'result');
                res.send({
                    message:'other_services created',
                });
            });
            
        });
    
    //update other_services
        app.put('/other_services/:id',upload.single('image'),(req,res)=>{
            //console.log('putdata');
            //console.log(req.body,'updatedata');
            let gID = req.params.id;
            let gtitle = req.body.title;
            let gdescription = req.body.description;
            let gcontactinf = req.body.contactinf;
            let glocation = req.body.location;
            let image = '';
            if(req.file){
                image = req.file;
                deleteFileOS(gID);
                pathImage = image.destination+'/'+image.filename;
            }else{
                pathImage = req.body.image;                 
            }
    
    
            let qr = `update other_services set title = '${gtitle}', description = '${gdescription}', contactinf = '${gcontactinf}', location = '${glocation}',  image = '${pathImage}' where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'Otros servicios publicos ha sido actualizado'
                });
            });
        });
    
    //delete single other_services
        app.delete('/other_services/:id',(req,res)=>{
            let gID = req.params.id;
            deleteFileOS(gID);
            let qr = `delete from other_services where id = '${gID}'`;
            db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                res.send({
                    message:'data deleted'
                });
            });
        });
    
        function deleteFileOS(gID) {
    
            let qr = `select * from other_services where id = ${gID}`;
            db.query(qr,(err, result) => {
                [{image}] = result;
                fs.unlink(path.resolve(image)).then(() => {
                    console.log('image deleted');
                }).catch(err => { console.error('image does not exist') })
            });
        }

    //...................................TABLE:SERVMUNI..................................................

    //get all municipal_services
    app.get('/municipal_services',(_req,res)=>{
        //console.log('get municipal_services');
        let qr = `select * from municipal_services`;
        db.query(qr,(err,result)=>{
            if(err)
            {
                console.log(err,'errs');
            }
            if(result.length>0)
            {
                res.send({
                    message:'all municipal_services data',
                    data:result
                });
            }
        });
    });
    
//get single municipal_services
    app.get('/municipal_services/:id',(req,res)=>{
        //console.log('get single data');
        //console.log(req.params.id,'get id==>');
        let gID = req.params.id;
        let qr = `select * from municipal_services where  id = ${gID}`;
        db.query(qr,(err,result)=>{
            if(err) {console.log(err);}

            if(result.length>0)
            {
                res.send({
                    message:'get single data',
                    data:result
                });
            }else
            {
                res.send({
                    message:'data not found'
                });
            }
        });
    });

//create municipal_services
    app.post('/municipal_services',upload.single('image'),(req,res)=>{
        //console.log(req.body,'createdata');
        let gtitle = req.body.title;
        let image = req.file;
        let pathImage = image.destination+'/'+image.filename;
        let gdescription = req.body.description;
        let gcontactinf = req.body.contactinf;
        let glocation = req.body.location;
        tzoffset = (new Date()).getTimezoneOffset() * 60000;
        let creationdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');

        let qr = `insert into municipal_services(title,description,contactinf,location,image,creationdate) values('${gtitle}','${gdescription}','${gcontactinf}','${glocation}','${pathImage}','${creationdate}')`;
        db.query(qr,(err,result)=>{
            if(err) {console.log(err);}
            console.log(result,'result');
            res.send({
                message:'post created',
            });
        });
        
    });

//update municipal_services
    app.put('/municipal_services/:id',upload.single('image'),(req,res)=>{
        //console.log('putdata');
        //console.log(req.body,'updatedata');
        let gID = req.params.id;
        let gtitle = req.body.title;
        let gdescription = req.body.description;
        let gcontactinf = req.body.contactinf;
        let glocation = req.body.location;
        let image = '';
        if(req.file){
            image = req.file;
            deleteFileMS(gID);
            pathImage = image.destination+'/'+image.filename;
        }else{
            pathImage = req.body.image;                 
        }


        let qr = `update municipal_services set title = '${gtitle}', description = '${gdescription}', contactinf = '${gcontactinf}', location = '${glocation}',  image = '${pathImage}' where id = '${gID}'`;
        db.query(qr,(err,result)=>{
            if(err) {console.log(err);}
            res.send({
                message:'El servicio municipal ha sido actualizado'
            });
        });
    });

//delete single municipal_services
    app.delete('/municipal_services/:id',(req,res)=>{
        let gID = req.params.id;
        deleteFileMS(gID);
        let qr = `delete from municipal_services where id = '${gID}'`;
        db.query(qr,(err,result)=>{
            if(err) {console.log(err);}
            res.send({
                message:'data deleted'
            });
        });
    });

    function deleteFileMS(gID) {

        let qr = `select * from  municipal_services where id = ${gID}`;
        db.query(qr,(err, result) => {
            [{image}] = result;
            fs.unlink(path.resolve(image)).then(() => {
                console.log('image deleted');
            }).catch(err => { console.error('image does not exist') })
        });
    }


    //...................................TABLE:POSTS..................................................

        //get all posts
            app.get('/posts',(_req,res)=>{
                //console.log('get posts');
                let qr = `select * from posts`;
                db.query(qr,(err,result)=>{
                    if(err)
                    {
                        console.log(err,'errs');
                    }
                    if(result.length>0)
                    {
                        res.send({
                            message:'all posts data',
                            data:result
                        });
                    }
                });
            });
            
        //get single post
            app.get('/posts/:id',(req,res)=>{
                //console.log('get single data');
                //console.log(req.params.id,'get id==>');
                let gID = req.params.id;
                let qr = `select * from posts where  id = ${gID}`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}

                    if(result.length>0)
                    {
                        res.send({
                            message:'get single data',
                            data:result
                        });
                    }else
                    {
                        res.send({
                            message:'data not found'
                        });
                    }
                });
            });

        //create post
            app.post('/posts',upload.array('images'),(req,res)=>{
                //console.log(req.body,'createdata');
                let postName = req.body.postname;
                let images = req.files;
                let supportImages= [];
                let gpdf = [];
                const regex = new RegExp("(?:\.pdf|\.docx|\.doc)$");
                for (let i = 0; i < images.length; i++) {
                    const element = images[i].destination+'/'+images[i].filename;
                    if (element[i] === element[0]){
                        frontPage = element;
                    }else{
                        if (regex.test(element)) {
                            gpdf.push(element);
                        }else{
                            supportImages.push(element);
                        }
                    }
                }

                let gdescription = req.body.description;
                tzoffset = (new Date()).getTimezoneOffset() * 60000;
                let creationdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');

                let qr = `insert into posts(postname,image,images,pdf,description,creationdate) values('${postName}','${frontPage}','${supportImages}','${gpdf}','${gdescription}','${creationdate}')`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    console.log(result,'result');
                    res.send({
                        message:'post created',
                    });
                });
                
            });


        //update post
            app.put('/posts/:id',upload.array('images'),(req,res)=>{
                //console.log('putdata');
                //console.log(req.body,'updatedata');
                let gID = req.params.id;
                let gdescription = req.body.description;
                let postName = req.body.postname;  
                let frontPage = '';
                let supportImages = '';
                let gpdf = '';
                let images = req.files;
                let numberimg = (req.files).length;
                const regex = new RegExp("(?:\.pdf|\.docx|\.doc)$");
                if(numberimg){
                    console.log('ESTAS EN LA PRIMERA OPCION DE IMAGES CAMBIADAS')
                        supportImages= [];
                        gpdf= [];
                        if(req.body.old_image && req.body.old_pdf){
                            frontPage = req.body.old_image;
                            gpdf = req.body.old_pdf;
                            for (let i = 0; i < images.length; i++) {
                                const element = images[i].destination+'/'+images[i].filename;
                                supportImages.push(element);
                                deleteFilePS(gID);
                            }
                        }
                        else if(req.body.old_image && req.body.old_images){
                            frontPage = req.body.old_image;
                            supportImages = req.body.old_images;
                            for (let i = 0; i < images.length; i++) {
                                const element = images[i].destination+'/'+images[i].filename;
                                gpdf.push(element);
                                deleteFilePDoc(gID);
                            }
                        }
                        else if(req.body.old_images && req.body.old_pdf){
                            gpdf = req.body.old_pdf;
                            supportImages = req.body.old_images;
                            for (let i = 0; i < images.length; i++) {
                                const element = images[i].destination+'/'+images[i].filename;
                                frontPage = element;
                                deleteFileP(gID);
                            }                        
                        }
                        else if(req.body.old_image){
                            frontPage = req.body.old_image;
                            for (let i = 0; i < images.length; i++) {
                                const element = images[i].destination+'/'+images[i].filename;
                                if (regex.test(element)) {
                                    gpdf.push(element);
                                    deleteFilePDoc(gID);
                                }else{
                                    supportImages.push(element);
                                    deleteFilePS(gID);
                                }
                            }
                        }
                        else if(req.body.old_pdf){
                            gpdf = req.body.old_pdf;
                            for (let i = 0; i < images.length; i++) {
                                const element = images[i].destination+'/'+images[i].filename;
                                if (element[i] === element[0]){
                                        frontPage = element;
                                        deleteFileP(gID);
                                }else{
                                        supportImages.push(element);
                                        deleteFilePS(gID);
                                }
                            }
                        }
                        else if(req.body.old_images){
                            supportImages = req.body.old_images;
                            for (let i = 0; i < images.length; i++) {
                                const element = images[i].destination+'/'+images[i].filename;
                                if (element[i] === element[0]){
                                    frontPage = element;
                                    deleteFileP(gID);
                                }else{
                                    gpdf.push(element);
                                    deleteFilePDoc(gID);
                                }
                            }                        
                        }
                        else{
                                for (let i = 0; i < images.length; i++) {
                                    const element = images[i].destination+'/'+images[i].filename;
                                    if (element[i] === element[0]){
                                            frontPage = element;
                                            deleteFileP(gID);
                                    }else{                                      
                                            if (regex.test(element)) {
                                                gpdf.push(element);
                                                deleteFilePDoc(gID);
                                            }else{
                                                supportImages.push(element);
                                                deleteFilePS(gID);
                                            }
                                    }
                                }
                        }
                } else{
                    frontPage = req.body.old_image;
                    supportImages = req.body.old_images;
                    gpdf = req.body.old_pdf;
                }


                let qr = `update posts set postname = '${postName}', image = '${frontPage}', images = '${supportImages}', pdf = '${gpdf}', description = '${gdescription}' where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'El post ha sido actualizado'
                    });
                });
            });

        //delete single post
            app.delete('/posts/:id',(req,res)=>{
                let gID = req.params.id;
                deleteFileP(gID);
                deleteFilePS(gID);
                deleteFilePDoc(gID)
                let qr = `delete from posts where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'data deleted'
                    });
                });
            });

            function deleteFileP(gID) {

                let qr = `select * from posts where id = ${gID}`;
                db.query(qr,(err, result) => {
                    [{image}] = result;
                    fs.unlink(path.resolve(image)).then(() => {
                        console.log('image deleted', image);
                    }).catch(err => { console.error('image does not exist') })
                });
            }

            function deleteFilePDoc(gID) {

                let qr = `select pdf from posts where id = ${gID}`;
                db.query(qr,(err, result) => {
                    [{pdf}] = result;
                    let pdfSupport = pdf.split(',')
                    for (let index = 0; index < pdfSupport.length; index++) {                  
                        fs.unlink(path.resolve(pdfSupport[index])).then(() => {
                            console.log('image deleted', pdfSupport[index]);
                        }).catch(err => { console.error('image does not exist') })
                    }
                });
            }

            function deleteFilePS(gID) {

                let qr = `select images from posts where id = ${gID}`;
                db.query(qr,(err, result) => {
                    [{images}] = result;
                    let imagesSupport = images.split(',')
                    for (let index = 0; index < imagesSupport.length; index++) {                  
                        fs.unlink(path.resolve(imagesSupport[index])).then(() => {
                            console.log('image deleted', imagesSupport[index]);
                        }).catch(err => { console.error('image does not exist') })
                    }
                });
            }

    //...................................TABLE:SPORTS..................................................

            //get all sports_areas
            app.get('/sports_areas',(_req,res)=>{
                //console.log('get sports_areas');
                let qr = `select * from sports_areas`;
                db.query(qr,(err,result)=>{
                    if(err)
                    {
                        console.log(err,'errs');
                    }
                    if(result.length>0)
                    {
                        res.send({
                            message:'all sports_areas data',
                            data:result
                        });
                    }
                });
            });
            
        //get single sports_areas
            app.get('/sports_areas/:id',(req,res)=>{
                //console.log('get single data');
                //console.log(req.params.id,'get id==>');
                let gID = req.params.id;
                let qr = `select * from sports_areas where  id = ${gID}`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
        
                    if(result.length>0)
                    {
                        res.send({
                            message:'get single data',
                            data:result
                        });
                    }else
                    {
                        res.send({
                            message:'data not found'
                        });
                    }
                });
            });
        
        //create sports_areas
            app.post('/sports_areas',upload.single('image'),(req,res)=>{
                //console.log(req.body,'createdata');
                let gtitle = req.body.title;
                let image = req.file;
                let pathImage = image.destination+'/'+image.filename;
                let gdescription = req.body.description;
                let gcontactinf = req.body.contactinf;
                let glocation = req.body.location;
                tzoffset = (new Date()).getTimezoneOffset() * 60000;
                let creationdate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
        
                let qr = `insert into sports_areas(title,description,contactinf,location,image,creationdate) values('${gtitle}','${gdescription}','${gcontactinf}','${glocation}','${pathImage}','${creationdate}')`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    console.log(result,'result');
                    res.send({
                        message:'sports_areas created',
                    });
                });
                
            });
        
        //update sports_areas
            app.put('/sports_areas/:id',upload.single('image'),(req,res)=>{
                //console.log('putdata');
                //console.log(req.body,'updatedata');
                let gID = req.params.id;
                let gtitle = req.body.title;
                let gdescription = req.body.description;
                let gcontactinf = req.body.contactinf;
                let glocation = req.body.location;
                let image = '';
                if(req.file){
                    image = req.file;
                    deleteFileSA(gID);
                    pathImage = image.destination+'/'+image.filename;
                }else{
                    pathImage = req.body.image;                 
                }
        
        
                let qr = `update sports_areas set title = '${gtitle}', description = '${gdescription}', contactinf = '${gcontactinf}', location = '${glocation}',  image = '${pathImage}' where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'Asociaciones ha sido actualizado'
                    });
                });
            });
        
        //delete single sports_areas
            app.delete('/sports_areas/:id',(req,res)=>{
                let gID = req.params.id;
                deleteFileSA(gID);
                let qr = `delete from sports_areas where id = '${gID}'`;
                db.query(qr,(err,result)=>{
                    if(err) {console.log(err);}
                    res.send({
                        message:'data deleted'
                    });
                });
            });
        
            function deleteFileSA(gID) {
        
                let qr = `select * from sports_areas where id = ${gID}`;
                db.query(qr,(err, result) => {
                    [{image}] = result;
                    fs.unlink(path.resolve(image)).then(() => {
                        console.log('image deleted');
                    }).catch(err => { console.error('image does not exist') })
                });
            }


            
    //...................................TABLE:DASHBOARD..................................................


//CHECK SERVER RUNNING

    app.listen(3000,()=>{
        console.log('Server is running...'); 
    });