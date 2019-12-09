var mysqlpromise = require('mysql2/promise');

exports.databaseFunctionsPromises = async function () {
    let connection;
    try {
        connection = await mysqlpromise.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });
 
        let queryCreateDatabase = "CREATE DATABASE TwinShips";
        await connection.query(queryCreateDatabase);
        connection.end();
 
        connection = await mysqlpromise.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "TwinShips"
        });

        let queryCreateTable = 'CREATE TABLE Shipdata (ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL ,Navn VARCHAR(255), Hjemhavn VARCHAR(255), Kaldesignal VARCHAR(255), Unikt_MMSI_nummer INT, Anvendelse VARCHAR(255), BRT_BT VARCHAR(255), Laengde INT, Maks_antal_om_bord INT)';
        await connection.query(queryCreateTable);
        
        var sql = "INSERT INTO " + "Shipdata" + " ( Navn, Hjemhavn, Kaldesignal, Unikt_MMSI_nummer, Anvendelse, BRT_BT, Laengde, Maks_antal_om_bord ) VALUES ?";
        var values = [
            ['SkiBladner II', 'København', 'OWYE', '219000446', 'Skibet anvendes som øvelsesskib for FDF Københavns Søkreds', '43', '18,5', '24']
        ];
        
        await connection.query(sql, [values]);
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};


exports.appendTable = async function () {

    let connection = await mysqlpromise.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "TwinShips"
    });

    var sql = "SELECT * FROM Shipdata";
    let result = await connection.query(sql);
    return result;
}


