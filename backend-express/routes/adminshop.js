const express = require('express');
// const hbs = require('hbs');
// const wax = require('wax-on');
// require('dotenv').config();
// const { createConnection } = require('mysql2/promise');

// const port = 3000;

// List of HTTP status codes Implemented
const statusCode_200_OK = 200;
const statusCode_201_Created = 201;
const statusCode_400_Bad_Request = 400;
const statusCode_401_Unauthorized = 401;
const statusCode_403_Forbidden = 403;
const statusCode_404_Not_Found = 404;
const statusCode_500_Internal_Server_Error = 500;

// let app = express();
const router = express.Router();

// app.set('view engine', 'hbs');
// app.use(express.static('public'));
// app.use(express.urlencoded({extended:false}));

// wax.on(hbs.handlebars);
// wax.setLayoutPath('../views/layouts');

// // require in handlebars and their helpers
// const helpers = require('handlebars-helpers');
// // tell handlebars-helpers where to find handlebars
// helpers({
//     'handlebars': hbs.handlebars
// })

// let connection;

// const connection = require('../database');
const pool = require('../database');

// async function admin() {
    // connection = await createConnection({
    // connection = createConnection({
    //     'host': process.env.DB_HOST,
    //     'user': process.env.DB_USER,
    //     'database': process.env.DB_NAME_EDS,
    //     'password': process.env.DB_PASSWORD
    // })

    // console.log("MySQL Database connected (connection) !");

    router.get('/', (req,res) => {
        // res.send('Hello, World!');
        
        // The 'res' response to the client can only sent once.
        // Cannot set headers after they are sent to the client.
        const data = {
            title: "SDS Backend with MySQL and Express!",
            name: 'Ng Yew Seng',
            email: 'ngys9919@yahoo.com'
        };

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <!-- Favicon-->
        <link rel="shortcut icon" type="image/x-icon" href="/bells_icon.ico">
        <title>Shop Database System (SDS) Backend Admin</title>
        </head>
        <style>
            .container { 
                max-width: 720px; /* Maximum width of the container */ 
                margin: 0 auto; /* Center the container */ 
                padding: 20px; 
                background-color: lightgrey; 
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
                transition: margin-left 0.3s; /* Smooth transition for margin-left */
                overflow: scroll; // Handle Overflow 
            } 
            .tab {
                display: inline-block;
                margin-left: 15%;  /* for e.g: value = 40px*/
                // position: relative;
                // left: 20px;
            }
            .tab4 
            {
                tab-size: 8;
            }
  
            #image {
                /* specify picture size */
                width: 50px;
                height: 50px;
                /* centered picture */
                display: block;
                margin: 0 auto;
                /* provide perimeter gaps */
                padding: 2px 2px;
            }
            
            /* Responsive margin-left effect */
  
            /* Extra small devices (phones, 600px and down) */
            @media only screen and (max-width: 600px) {
                .container {
                    max-width: 420px; /* Maximum width of the container */
                    margin-left:1%;
                }
            }
  
            /* Small devices (portrait tablets and large phones, 600px and up) */
            @media only screen and (min-width: 600px) {
                .container {
                    max-width: 600px; /* Maximum width of the container */
                    margin-left:5%;
                } 
            }
  
            /* Medium devices (landscape tablets, 768px and up) */
            @media only screen and (min-width: 768px) {
                .container {
                    max-width: 600px; /* Maximum width of the container */
                    margin-left:10%;
                }
            }
            
            /* Large devices (laptops/desktops, 992px and up) */
            @media only screen and (min-width: 992px) {
                .container {
                    max-width: 720px; /* Maximum width of the container */
                    margin-left:25%;
                }
            }
  
            /* Extra large devices (large laptops and desktops, 1200px and up) */
            @media only screen and (min-width: 1200px) {
                .container {
                    max-width: 720px; /* Maximum width of the container */
                    margin-left:25%;
                }
            }
        </style>
        <body>
        <div>
            <div style="text-align: center;">
                <h1 style="text-decoration: underline;">Title: ${data.title}</h1>
                <h3>Name: ${data.name}</h3>
                &NewLine;
                <p style="font-size: 15pt; color: blue;">Email: ${data.email}</p>
                <a href="/api/adminshop/main"><img src="./../../img/home.png" alt="Goto SDS Home" id="image"></a>
                <div style="text-align: center;"><a href="/api/adminshop/main">Back to Shop Admin</a></div>
            </div>
            </br>
            <div class="container">
                <img style="width: auto; height: 320px; display: block; margin: 0 auto;" src="./../../img/mysql-sds-database.png" alt="database: aieshop2"></img>
                <br/>
                <h3>server url:<h3>
                <h4></h4>
                <b>/: &emsp; root route</b>
                <h3>format: </h3>
                <pre class="tab4">route implemented:    form-http method, access control, description</pre>
                <h3>implementations: </h3>
                <pre class="tab4">/taskforce    GET, PUBLIC, This route can get the complete taskforce list and 
                <wbr>perform searches using query string with members, with wildcard expression (starting %, 
                <wbr>ending %, in-between % %, exact match), implicit case-insensitive.</pre>
                <pre class="tab4">/supervisor  GET, PUBLIC, This route can get the complete supervisor list and
                <wbr>perform searches using query string with name, with auto-insertion of wild card (in-between % %), 
                <wbr>case insensitive.</pre>
                <pre class="tab4">/contact     GET, PUBLIC, This route get the complete contact list and has no search.</pre>
                <pre class="tab4">/employees    GET, PUBLIC, This route can get the complete employee list.</pre>
                <pre class="tab4">/employees/create     GET,POST, PUBLIC, This route can create an employee record with the 
                <wbr>provided info using input form format, with fields name, designation, department, date_joined,
                <wbr>supervisor and ranking, ready for submission.</pre>
                <pre class="tab4">/employees/:employee_id/edit    GET,POST PUBLIC, This route can retrieve the specified employee
                <wbr>and display the detailed info on the employee with the provision of employee_id using input form
                <wbr>format, with fields name, designation, department, date_joined, supervisor and ranking,
                <wbr>ready for updating.</pre>
                <pre class="tab4">/employees/:employee_id/delete      GET,POST, PUBLIC, This route can delete the employee record
                <wbr>with the provision of employee_id with a confirmation dialog box.</pre>
            </div>
        </div>
        </body>
        </html>
  `     ;
  
        res.header('Content-Type', 'text/html');
        res.send(html);

    });

    // Implementing Read
    // Implement a Route to Show Shop Dashbaord
    router.get("/main", async function(req,res){
        try {
    
        res.render('layouts/main', {
        });

    } catch (error) {
        console.error("Error fetching shop record:", error);
        res.status(statusCode_500_Internal_Server_Error);
    }
    });

    // Implementing Read
    // Implement a Route to Show Tests Records
    router.get("/tests", async function(req,res){
        try {
            const people = 
                {
                  firstname: "Yehuda",
                  lastname: "Katz",
                  url: "https://www.google.com/",
                  text: "See Website"
                }; 

            const general = 
                {
                    firstname: "Yehuda",
                    lastname: "Katz",
                    link1: "https://www.google.com/",
                    text1: "Google Website",
                    link2: "https://www.yahoo.com/",
                    text2: "Yahoo Website"
                };

        res.render('shops/tests', {
            'people': people,
            'general': general,
            'fetchURLEmployees': process.env.SERVER_URL + "/api/admin/employees",
            'fetchURLContact': process.env.SERVER_URL + "/api/admin/contact",
            'fetchURLSupervisor': process.env.SERVER_URL + "/api/admin/supervisor"
        });

    } catch (error) {
        console.error("Error fetching shop record:", error);
        res.status(statusCode_500_Internal_Server_Error);
    }
    });

    // Implementing Read
    // Implement a Route to Show Shop Records
    router.get("/shop", async function(req,res){
        try {
            res.redirect('/api/adminshop/main');
            // res.redirect('http://localhost:3000/api/adminshop/main');

    } catch (error) {
        console.error("Error fetching shop record:", error);
        res.status(statusCode_500_Internal_Server_Error);
    }
    });

    // Implementing Read
    // Implement a Route to Show Orders Records
    router.get("/orders", async function(req,res){
        try {
            res.redirect('/api/adminshop/main');
            // res.redirect('http://localhost:3000/api/adminshop/main');

    } catch (error) {
        console.error("Error fetching order record:", error);
        res.status(statusCode_500_Internal_Server_Error);
    }
    });

    // 3. START SERVER (Don't put any routes after this line)
    // app.listen(3000, function () {
    // app.listen(3000, ()=>{
    // app.listen(port, function () {
    //     console.log("Server is running at port:" + port);
    // });
// }

// main();

// module.exports = {
//     admin
// };

module.exports = router;
