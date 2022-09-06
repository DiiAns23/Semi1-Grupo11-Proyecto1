const conn = require('./conexion');

const execute_sp = async function execute_sp(statement, params) {
    try {
        const [rows] = await conn.promise().query(statement, params);
        return rows;
    } catch (err) {
        console.log('> Error :' + err);
        return [];
    }
};

module.exports = execute_sp ;
