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

    static async getEstimate() {
        console.log("getEstimate");
        const query=`select materialvalue.m_name,materialvalue.m_amount,quantity,m_cost from estimate,est_mat,materialvalue where estimate.e_id=est_mat.e_id and est_mat.m_id=materialvalue.m_id and estimate.e_id=1;`;
        const out = await db.query(query);
        return out.rows;
    }

}

module.exports = QS;