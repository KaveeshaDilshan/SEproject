const db = require('../config/db');
class QS {
    static async getMaterialValues() {
        console.log("getMaterialValues");
        const query=`SELECT * FROM materialvalue`;
        const out = await db.query(query);
        return out.rows;
    }
    
    static async addNewMaterialTodb(m_name, m_amount, m_cost) {
        console.log("getMaterialValues");
        const query=`CALL addMaterialValue($1,$2,$3)`;
        const out = await db.query(query,[m_name, m_amount, m_cost]);
        return out.rows;
    }
}

module.exports = QS;