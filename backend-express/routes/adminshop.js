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
        res.send('Hello, World to Shop Management!');
    });

    // Implementing Read
    // Implement a Route to Show Shop Dashbaord
    router.get("/shop", async function(req,res){
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

        res.render('shops/shop', {
            'people': people,
            'general': general,
            'fetchURLEmployees': process.env.SERVER_URL + "/api/admintalent/employees",
            'fetchURLContact': process.env.SERVER_URL + "/api/admintalent/contact",
            'fetchURLSupervisor': process.env.SERVER_URL + "/api/admintalent/supervisor"
        });

        // res.json({
            // employees
            // taskforce
        // })

    } catch (error) {
        console.error("Error fetching shop record:", error);
        res.status(statusCode_500_Internal_Server_Error);
    }
    });

    // Implementing Read
    // Implement a Route to Show Taskforces Records
    router.get("/orders", async function(req,res){
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

        // this is the same as let members = req.query.members
        // syntax: object destructuring
        let { members } = req.query;

        // console.log(members);

        let criteria = null;

        if (members) {
            criteria = "'" + members + "'";
        }

        // console.log(criteria);

        let [employees] = [];

        if (criteria) {
            // Without sorting, but with search
            // Obtaining the Results with Nested Tables
            [employees] = await pool.query({
                'sql': (`
                SELECT * FROM eds.Employees 
                JOIN eds.EmployeeTaskforce ON Employees.employee_id = EmployeeTaskforce.employee_id 
                JOIN eds.Taskforces ON EmployeeTaskforce.taskforce_id = Taskforces.taskforce_id
                WHERE Employees.name LIKE ${criteria}
                `),
                nestTables: true
            });
        } else {
            // With Ascending sorting, but without search
            // Obtaining the Results with Nested Tables
            [employees] = await pool.query({
                'sql': `
                SELECT * FROM eds.Employees 
                JOIN eds.EmployeeTaskforce ON Employees.employee_id = EmployeeTaskforce.employee_id 
                JOIN eds.Taskforces ON EmployeeTaskforce.taskforce_id = Taskforces.taskforce_id
                ORDER BY Employees.name ASC
                `,
                nestTables: true
            });
        }
        
        // console.log(employees);

        res.render('shops/orders', {
            'employees': employees,
            'people': people,
            'general': general,
            'fetchURLEmployees': process.env.SERVER_URL + "/api/admin/employees",
            'fetchURLContact': process.env.SERVER_URL + "/api/admin/contact",
            'fetchURLSupervisor': process.env.SERVER_URL + "/api/admin/supervisor"
        });

        // res.json({
            // employees
            // taskforce
        // })

    } catch (error) {
        console.error("Error fetching taskforce record:", error);
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
