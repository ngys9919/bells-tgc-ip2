const pool = require('../database');

// GET => Read
// GET a list of databses
async function getDatabases() {
  const [rows] = await pool.query(`SELECT Table_schema AS 'Databases' 
                                    FROM information_schema.TABLES 
                                    GROUP BY table_schema`);
  return rows;
}

module.exports = {
    getDatabases
};

// Secure Your Database Interactions

// Database Security:
// The database is the heart of most modern web aplications - without it the
// applications are just empty husks. Books with covers but no pages. Application
// data stored in the database, especially user information, is a prime target for
// attackers. They want the passwords and personal information to log into
// accounts on other sites. They desire financial and credit card information to
// empty user bank accounts. They may want sensitive - or potentially embarrassing -
// information that can be used to blackmail users.

// Knowledge is power.

// Many companies suffered data breaches in 2014, and millions of individuals
// saw their Social Security numbers, credit card numbers, and passwords
// stolen. While many of these attacks, especially high-profile ones, used highly
// sophisticated methods, some used a far simpler database injection attack.
// This is similar to shell injection, except the targeted execution layer is the
// database. As mentioned before, OWASP (Open Web Application Security Project)
// considers database injection the top attack vector against web applications.

// https://www.owasp.org

// We want to stop attackers from getting their hands on our users' data, If the
// attackers succeed, we lose our users' trust, our business won't be successful,
// and we won't be able to afford that new Telsa we like so much. 

// DB0: 1.Database User Authentication
// Any database that you work with, and it doesn't matter if we're talking about
// MySQL, Mongo, Redis, or any other database system, should be configured
// to use authenticated users. Sometimes people don't bother with user accounts
// password. They typically block outside connections, which is a good thing to
// do. Unfortunately, it's not sufficient, even if the database lives on the same
// machine.

// Yes, blocking outside connections narrows the attack surface significantly.
// But, the attacker can bypass this restriction by gaining access to one of the
// whitelisted machines, or the IP addresses. If I'm running a Redis database
// server on my machine with default settings enabled - no authentication - then
// all the attacker has to do is somehow get onto my machine. It doesn't matter
// if the attacker is using an unprivileged account since there's no barrier to
// connecting to the database. Voila! Full access to every database and all the
// data.

// Just because someone has access to the server doesn't mean they should
// have access to all the data in each database.

// It's clear that proper authentication is an important aspect of defense. It will
// be harder for attackers to pull off a successful attack if the application is
// smart about who it lets in, who it keeps out, and who is allowed to do what.
// Setting up authentication also lets you follow the principle of least privilege
// to fine-tune different levels of access for each account.

// DB0: 2.Separate Database Users 
// Our theoretical web application has three separate database accounts for
// users - guest, authenticated, and admin;

// 2.1 Guest Users -> Read Only
// Guest users can only read articles on the site - so the guest database
// account needs only read access for the database tables.

// 2.2 Authenticated Users -> Read/Write Only
// Authenticated users can read and write articles, as well as post comments -
// meaning the authenticated database account should have read and write access
// on tables related to articles and comments.

// 2.3 Admin Users -> Read/Write/Modified
// Admin  users can add new users and do other administrative tasks. The
// admin  account on the database has the highest privilege level, with
// read/write privileges on most, if not all, tables.

// You might wonder why you need to go through the trouble of having separate
// database accounts if you already have separate user roles. Suppose you have
// a database injection vulnerability somewhere in the guest section of the
// application. Attackers who exploit this hole won't be able to cause as much
// damage because the guest database user has only read privileges on the tables.

// Your admin account may not even need all the privileges it currently has. You
// probably would never drop tables from the web application, for example.
// Remove that privilege from the admin  database account and the attacker won't
// be able to use code injection to delete data. You'd still have elevated privileges
// as the admin user which connected directly to the database, which is all you
// need.

// Defining multiple accounts in the database with various levels of privileges
// is a good thing, but you need to use them. Look at the following code snippet
// to see an example of how you could manage multiple connections to the 
// datbase: see mysql-multiple-connections.js

// Set up guest connection
// var guestConnection = mysql.createConnection({
//   host     : 'localhost',
//   user     : args.gu,
//   database : args.d,
//   password : args.gp,

//   // Set for testing, do not do unless you have a good reason
//   multipleStatements: true
// });
// guestConnection.connect();

// // Set up admin connection
// var adminConnection = mysql.createConnection({
//   host     : 'localhost',
//   user     : args.au,
//   database : args.d,
//   password : args.ap,

//   // Set for testing, do not do unless you have a good reason
//   multipleStatements: true
// });
// adminConnection.connect();

// // Middleware for checking the logged in status
// app.use(function (req, res, next) {
//   // If we have an admin session then attach adminConnection
//   if(req.session && req.session.isAdmin) {
//       req.db = adminConnection;
//   }
//   // Otherwise attach guestConnection
//   else {
//       req.db = guestConnection;
//   }
//   next();
// });

// DB0: 3. Separate Clients Databases
// Many web applications serve as platforms for multiple clients at the same
// time. Depending on the application, this will involve storing business data or
// logic in the databse. For example, you may have a CRM system where clients
// store their own records, connections, and billing information. You need to
// safely separate the data so that clients can't access each other's data. There
// are many approaches ranging from totally isolated databases to fully shared
// ones, but they tend to fall somewhere along the spectrum.

// The security of these methods can vary and depend on other development
// and infrastructure requirements. But let's look at each one in detail.

// 3.1 Isolated Approach
// First up is having separate databases for everyone. This is the most isolated approach.
// Every client has a separate database for its data and each client can customize the 
// data structure for its own needs. It can be more secure, but it comes with higher
// infrastructure costs. Databases take up space (an empty MongoDB database takes 32MB, for example),
// and there's only so much space available on a server.

// Completely isolating your tenants is a good approach when you have strict
// security needs and clients who are willing to pay extra for security. You can
// use this approach with most SQL and NoSQL databases (including MongoDB).

// 3.2 Shared Approach
// The middle approach is to use the same database but separate the schemas (tables/collections)
// for each client. Each tenant has access to only its own set of tables. Like the isolated approach,
// each tenant can customize the data structures and keep database connection levels separate from 
// everyone else. This method makes backups tricky. In the isolated approach, you back up and restore 
// a single tenant's database without affecting anyone else. Here, youn have to back up all the tables
// together, regardless of client. Restoring a single tenant's data is a challenge as you don't want
// to affect others.

// Neither can you fully use this approach in MongoDB because it doesn't have
// collection-level access control. While there are modules like mongoose-multitenant,
// you still can't control connection access at the collection level.You'd miss
// out on most of the security benefits of this approach, and MongoDB has
// limits on how many collections you can create in a single database as well.

// https://www.npmjs.com/package/mongoose-multitenant

// 3.3 Hybrid Approach
// The last approach is the most common - storing all the clients' data in the
// same database and sharing the database schema. The data is separated by 
// providing a unique tenant identifier for each row. It's the cheapest approach
// because it has the lowest infrastructure requirements, but it has the highest
// implementation cost for security. You have to handle security in your code
// and manage all the data-separation mechanisms yourself.

// Conclusion:
// Most applications strat out from a shared model, since businesses generally
// strat thinking about multi-tenancy only after the application has gotten large
// enough. Or they have to comply with regulatory requirements. There's no
// best approach, because that depends on your specific needs. I recommend
// generally starting out with the shared approach and eventually graduating
// to the isolated approach when you can.

// DB1: Database Attacks
// Next, let's look at how to mitigate attacks against data stored in your database
// (or databases).Database injection is a variation of code injection, but the intended
// target is the back-end database and not the application server.

// If an application has code injection issues, it means the application is not
// correctly validating all input fields on the site. The same thing applies to
// database injection. Attackers enter a series of database commands into the
// application's input fields (such as a textbox in a blog's comment form) to trick
// the application into executing the commands within the datbase. If the 
// application builds its database queries by concatenating user input with
// hardcoded strings instead of using a decent ORM (Object-Relational Mapper)
// and neglects to properly escape input data, then the attacker succeeds.

// For all database examples, we'll use the minimist module to parse command-line
// arguments - which we'll use to supply the database connection information.

// https://github.com/substack/minimist

// One of the most popular MySQL drivers for Node.js is node-mysql, which disables 
// by default the ability to execute multiple commands in a single query.
// This makes SQL injection attacks much harder to launch on web applications
// if you use this module. The module won't let the attacker terminate the original
// query to start a separate malicious one.

// MySQL for Node.js: mysql vs mysql2

// For Node.js, there are 2 different MySQL drivers: mysql and mysql2

// https://github.com/felixge/node-mysql

// https://github.com/sidorares/node-mysql2

// This is just 2 different APIs written by regular people. Difference is in syntax of commands 
// and maybe in performance, just install both, make your own tests for your goals and choose 
// one you think is more suitable for you.

// Just a side note, from my experience flexge/node-mysql doesn't work well with JSON type 
// (JSON_OBJECT, JSON_ARRAY..etc) very well. In fact, you need to parse the query result to really work with it. 
// Instead, sidorares/node-mysql2 seems to natively parse it when the corresponding column is JSON type, 
// which save lot of times.

// The other difference is, mysql npm module still doesn't support caching_sha2_password authentication 
// introduced in MySQL 8, while mysql2 npm module does. This is why i migrated to mysql2.


// DB1: SQL Injection Attacks => database-side attack
// As you just saw, attackers can cause a lot of damages with database injection.
// We'll now look at four main defense methods to protect against this kind of
// attack: controlled error messages, input validation, escaping, and prepared statements.

// Database injection attacks are divided into two types: blind and normal SQL
// injection. In normal SQL injection the attacker will see helpful error messages
// and/or the result of the attack on the web page. With blind SQL injection,
// the attacker sees only generic error messages if something is not valid.

// 1.Controlled Error Messages
// The mechanics of defending are the same, but blind SQL injection is much
// harder and more time consuming for the attacker to pull off. This is why your
// first line of defense is to handle errors properly. Forcing the attacker to spend
// more time determining whether there is a vulnerability and how to get at the
// data benefits you.

// 2.Input Validation
// The second step is validating user input. You'll have to verify that user-entered
// data falls within expected parameters and is not malicious. Say you're manually
// constructing MySQL commands by combining user-entered data with queries hardcoded
// within the application code. This approach is very important if you're using a 
// database driver and handling database queries this way. You have to be attentive 
// when checking every input to make sure users aren't entering malicious strings.
// The best approach is whitelisting, or allowing only types of data you expect to see.

// 3.Escaping
// Let's move on to the third approach, escaping. This means that all characters
// that can potentially break the query are formatted in such a way that the
// application doesn't treat them as part of a command.
// This is a widely used method and many libraries, including node-mysql,
// providing ready-to-go functions for escaping well-known problem characters.
// You can utilize connection.escape(), which is the Node equivalent of PHP's
// mysqli_escape_string(). This way you don't have the hassle of trying to write the
// function yourself since you can just use a well-tested one.

// 4.Prepared Statements
// The final method is to use prepared statements; 
// Here, you completely separate the command and data parts of the query by
// sending them to the datbase separately. This leaves no room for misinterpretation
// and is a good way to protect against injection. As a bonus, it also provides
// a speed boost on queries that run many times because you can reuse 
// the same procedure.

// Conclusion:
// Prepared statements are by far the best solution against SQL injection attacks
// and are the favored approach. The second-best option is to use proper
// escaping, which is the method node-mysql uses currently. Whitelisting, while
// very effective, is the least favored. That's because it's time consuming to
// whitelist all possible endpoints and sometimes you need to have special
// characters in the query, which makes this approach less effective. Whichever
// method you use in your application, don't forget to limit the error messages.

// Watch Out for ORMs
// Developers often use an ORM (Object-Relational Mapper) instead of constructing
// commands manually, and that can introduce some unexpected behavior.

// Numerous ORMs are available for Node.js and various databases.Let's look
// at one of the popular ORM mappers for MySQL, MariaDB, SQLite, and PostgreSQL
// in Node.js - Sequelize.

// http://sequelizejs.com

// http://www.mysql.com

// var sequelize = new Sequelize(args.d, args.u, args.p, {
//   dialect: 'mysql',
//   port: 3306
// });

// While ORMs typically implement internal escaping based on model properties and types,
// Sequelize does not always perform thorough input cleaning. Some inputs are left
// vulnerable and can be used to construct malicious SQL statements. It would be foolish to assume
// the ORM is going to do something without checking. Trust but verify.

// ORMs by their nature introduce overhead into your application, because they
// construct interfaces around your data structures. This can lead to serious 
// performance issues in some cases. So using an ORM isn't always the best
// solution. But if you're going to use ORMs, you need to test how they handle
// input cleaning.

// An important difference is that Sequelize uses node-mysql as its MySQL driver.
// As you saw earlier, node-mysql disables by default the ability to run multiple statements 
// off a single command. But POstgreSQL's driver doesn't have that setting, so a similar
// attack will succeed on that database. You'll need to do validation or change
// the configuration if you're working with PostgreSQL or other databases that
// don't disable multiple queries by default:

// http://www.postgresql.org

// var sequelize = new Sequelize(args.d, args.u, args.p, {
//   dialect: 'postgres',
//   port: 5432
// });

// Here, the solution is to either not allow the user to set the limit parameter or
// validate that you're dealing with a number.

// The moral of this example is that you must be ever vigilant when using third-
// party modules and talking to the database. You should always limit user
// interaction with your database and test what users are allowed to do. Knowing
// this makes you security conscious and in a better position to write secure
// applications.

// DB2: NoSQL Injection Attacks => database-side attack
// MongoDB and CouchDB are widely used alternatives to relational datbases
// when building Node.js applications. They don't use a query language like SQL
// for mapping the data - hence the name NoSQL. Instead they have their own
// methods and queries. You may now think that using NoSQL means SQL 
// injection is not a problem for you. Alas, that isn't quite true.

// http://www.mongodb.org

// http://couchdb.apache.org

// Strictly speaking, SQL injection doesn't affect NoSQL databases. The thing
// is SQL injection isn't the only form of database injection, and there are other
// ways to inject commands despite not using the traditional SQL syntax. These
// NoSQL injection attacks execute within a procedural language rather than
// in the declarative SQL language, so the potential impact of these attacks is
// greater.

// The first security issue for NoSQL databases is that by default they don't have
// any authentication. Instead, they filter connections only to localhost. As you
// can see, that's not necessary a good thing.

// Let's see how to connect to our configured MongoDB using a password with
// one of the most (if not the most) popular MongoDB ORMs in use - Mongoose:

// http://mongoosejs.com

// mongoose.connect('mongodb://user:pass@localhost:port/database');

// In MongoDB, the user input was not validated before constructing the search, which means
// attackers can add malicious code into the statement. MongoDB won't be 
// affected by SQL statementsm but it does support JavaScript commands in its
// queries. The attacker can execute JavaScript statements on the database
// layer. Keep in mind that the attacker has access to the whole JavaScript syntax
// to craft a more complicated query. Because most NoSQL databases don't support
// prepared statements, you're left with two solutions - validation and escaping.
// Be sure to use them liberally.

// You just saw that NoSQL is not inherently safer just because it does not have
// SQL. When constructing complex queries with user input, make sure the
// data falls within the narrowly defined parameters of your query. Just as you
// would with a SQL database.

// DB3: Database Concurrency
// Databases are an integral and powerful part of a web application, and you
// must secure all transactions in order to protect your clients' data. As you
// have learned, you must secure your datbase connections and limit access privileges
// where you can. You must also be vigilant about escaping and validating all user input 
// that comes into contact with the database, even if it's a NoSQL database. 
// Implementing these two steps will greatly increase the scurity of your data.

// Now that you've secured how the application communicates with the database,
// the attackers will find it harder to target your application. Don't get too cozy
// just yet, because there are many more attack vectors to defeat out there. Next
// we'll move on to another common issue in web application design that also
// affect databases: concurrency.

