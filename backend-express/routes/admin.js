const express = require('express');
// const hbs = require('hbs');
// const wax = require('wax-on');
// require('dotenv').config();
// const { createConnection } = require('mysql2/promise');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

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

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
}

const formatDate_YYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatDate_DDMMYYYY = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
};


// async function admin() {
// connection = await createConnection({
// connection = createConnection({
//     'host': process.env.DB_HOST,
//     'user': process.env.DB_USER,
//     'database': process.env.DB_NAME_EDS,
//     'password': process.env.DB_PASSWORD
// })

// console.log("MySQL Database connected (connection) !");

router.get('/', (req, res) => {
    // res.send('Hello, World!');

    // The 'res' response to the client can only sent once.
    // Cannot set headers after they are sent to the client.
    const data = {
        title: "Backend with MySQL and Express!",
        name: 'Ng Yew Seng',
        email: 'ngys9919@yahoo.com'
    };

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Backend Administration</title>
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
            </div>
            </br>
        </div>
        </body>
        </html>
  `     ;

    res.header('Content-Type', 'text/html');
    res.send(html);

});

// Use async/await instead of callbacks
const root = {
    users: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM aieshop2.users');
            return rows;
        } catch (error) {
            throw new Error('Database query failed for users: ' + error.message);
        }
    },
    orders: async () => {
        try {
            const [rows] = await pool.query('SELECT orders.id, users.name, orders.total, orders.status, orders.checkout_session_id, orders.created_at FROM aieshop2.orders JOIN aieshop2.users ON orders.user_id = users.id');
            return rows;
        } catch (error) {
            throw new Error('Database query failed for orders: ' + error.message);
        }
    },
    products: async () => {
        try {
            // const [rows] = await pool.query('SELECT * FROM aieshop2.aiproducts');
            const [rows] = await pool.query(`SELECT ai.id,
                                    c.type AS type_id,
                                    ai.productID,
                                    ai.source_table,
                                    COALESCE(a.title, i.title, m.title, v.title) AS title
                                    FROM aieshop2.aiproducts ai
                                    JOIN aieshop2.category c ON ai.productCodeID = c.id
                                    LEFT JOIN aieshop2.aibooks a ON ai.source_table = 'aibooks' AND ai.productID = a.id
                                    LEFT JOIN aieshop2.aiimage i ON ai.source_table = 'aiimage' AND ai.productID = i.id
                                    LEFT JOIN aieshop2.aimusic m ON ai.source_table = 'aimusic' AND ai.productID = m.id
                                    LEFT JOIN aieshop2.aivideo v ON ai.source_table = 'aivideo' AND ai.productID = v.id;
                                  `);
            return rows;
        } catch (error) {
            throw new Error('Database query failed for products: ' + error.message);
        }
    },
};

router.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

// Implementing Read
// Implement a Route to Show Sitemap Records
router.get("/sitemap", async function (req, res) {
    try {
        const developer =
        {
            firstname: "Eric Ng",
            lastname: "Yew Seng",
            url: "http://localhost:5173/",
            text: "AI-eShop Website"
        };

        const administrator =
        {
            linkaieshop: "http://localhost:5173",
            textaieshop: "AI-eShop Landing Page",
            linkshopadmin: "/api/adminshop/main",
            textshopadmin: "Shop Admin",
            linktalentadmin: "/api/admintalent/main",
            texttalentadmin: "Talent Admin",
            linkdatabase: "/api/admin/graphql",
            textdatabase: "Database GraphiQL"
        };

        res.render('shops/sitemap', {
            'developer': developer,
            'administrator': administrator,
            'fetchURLAdminShop': process.env.SERVER_URL + "/api/adminshop/main",
            'fetchURLAdminTalent': process.env.SERVER_URL + "/api/admintalent/main",
            'fetchURLDatabase': process.env.SERVER_URL + "/api/admin/graphql",
        });

    } catch (error) {
        console.error("Error fetching sitemap record:", error);
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
