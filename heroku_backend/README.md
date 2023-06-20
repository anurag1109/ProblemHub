NOTE: Before run 1st time server follow these instruction given below.

1. run command:   npm install 

2. go to "config" folder and open "config.json" file and set your "your_database_name", "your_username","your_password".
example: "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "your_database_name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },

3. go to "config" folder and open "connection.js" file and set your "your_database_name", "your_username",   "your_password".  
 example: let sequelize= new Sequelize("your_database_name", "your_user_name", "your_password", {
    host: 'localhost',
    dialect: 'mysql',
  });

4. run command this command for create tables which are used in this app. this command used to run migration.
   command-:   npx sequelize-cli db:migrate

5. start the server using these commands:
   1. npm start       or   node server.js    or     nodemon server.js


NOTE: node.js must be installed in your system and mysql also must be installed.
NOTE: If you want to use "sql" server insted of "mysql" then you must be follow instruction given below.

   1. install the driver using this command:       npm install --save tedious
   2. follow 3rd instruction only change "dialect":"mssql" in "connection.js file"
       example:  let sequelize= new Sequelize("your_database_name", "your_user_name", "your_password", {
                     host: 'localhost',
                     "dialect":"mssql",  // for  Microsoft SQL Server 
                     });
   3. set  "dialect":"mssql", in "config.json".
      example:     "development": {
                          "username": "your_username",
                          "password": "your_password",
                         "database": "your_database_name",
                         "host": "127.0.0.1",
                         "dialect":"mssql",  // for  Microsoft SQL Server
                },              