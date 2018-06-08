var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    // port: '3306',  
    database: 'test1',
    // multipleStatements: true
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

function doCreateTable() {
    var sql = "CREATE TABLE person(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,name varchar(255),sex varchar(255))";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[CREATE TABLE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------CREATE TABLE----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });
}

function doDropTable() {
    var sql = "DROP TABLE person";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[DROP TABLE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------DROP TABLE----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });
}


function doQuery() {
    var sql = 'SELECT * FROM person';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });
}


function doInsert() {
    var addSql = 'INSERT INTO person(id,name,sex) VALUES(0,?,?)';
    var addSqlParams = ['jim', 'male'];
    // addSqlParams = [
    //     ['jim', 'male'],
    //     ['lucy', 'female'],
    //     ['小强', '男']
    // ];
    connection.query(addSql, addSqlParams);
    addSqlParams = ['lucy', 'female'];
    connection.query(addSql, addSqlParams);
    addSqlParams = ['小强', '男'];
    connection.query(addSql, addSqlParams);
    // connection.query(addSql, [addSqlParams], function (err, result) {
    //     if (err) {
    //         console.log('[INSERT ERROR] - ', err.message);
    //         return;
    //     }
    //     console.log('--------------------------INSERT----------------------------');
    //     console.log('INSERT ID:', result.insertId);
    //     console.log('-----------------------------------------------------------------\n\n');
    // });
}

function doUpadate() {
    var modSql = 'UPDATE person SET name = ? WHERE name =?';
    var modSqlParams = ['jim cooper', 'jim'];
    connection.query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

function doDelete(name='lucy') {
    var delSql = `DELETE FROM person where name="${name}"`;
    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
}
function doDeleteAll(){
    var delSql = `DELETE FROM person where name!=""`;
    connection.query(delSql);
}

// doCreateTable(); // 执行一次
doInsert();
doQuery();
doUpadate();
doQuery();
doDelete('lucy');
doQuery();
doDeleteAll();
doQuery();
// doDropTable(); // 删表执行一次


connection.end();