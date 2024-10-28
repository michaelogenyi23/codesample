const mysql = require('mysql');

exports.handler = (event, context, callback) => {
    const connection = mysql.createConnection({
        host: 'temp-1.cluster-c2yexqjtlc7z.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'Nashuanh1',
        database: 'rws'
    });

    connection.connect(err => {
        if (err) {
            console.error('Database connection failed:', err.stack);
            callback(err);
            return;
        }

        console.log('Connected to the database.');

        // Example query 1: Select data from a table
        connection.query('SELECT * FROM your_table', (err, results) => {
            if (err) {
                console.error('Query execution failed:', err);
                callback(err);
                return;
            }

            console.log('Query 1 results:', results);

            callback(null, results);
        });

        connection.end();
    });
};



// import * as AWS from 'aws-sdk';
// import { Context } from 'aws-lambda';
// import * as Knex from 'knex';


// AWS.config.update({ region: 'us-east-1' });

// //our database info
// const host = 'temp-1.cluster-c2yexqjtlc7z.us-east-1.rds.amazonaws.com';
// const user = 'admin';
// const password = 'Nashuanh1';
// const database = 'rws';

// const connection = {
//     ssl: {rejectUnauthorized: false},
//     host,
//     user,
//     password,
//     database,
// };

// const knex = Knex({
//     client: 'mysql',
//     connection,
// });

// export const handler = async (event: any, context: Context) => {

// try{
//     //our 
//     await knex('').insert({
//         key: '',
//         val: '',
//     });
//     const res = await knex('').select();
//     console.log(res);
// }   catch(err){
//     console.error(err);
// }
// };