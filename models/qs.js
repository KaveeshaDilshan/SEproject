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

    static async getEstimate(e_id) {
        console.log(`getEstimate`);
        const query=`select materialvalue.m_name,materialvalue.m_amount,quantity,m_cost,estimate.p_id from estimate,est_mat,materialvalue where estimate.e_id=est_mat.e_id and est_mat.m_id=materialvalue.m_id and estimate.e_id=$1`;
        const out = await db.query(query,[e_id]);
        return out.rows;
    }
    
    static async getEst_Project(e_id) {
        console.log("getProject");
        const query=`select project.p_id,project.name,project.start_date,estimate.e_id,estimate.submit_status,estimate.create_date,estimate.submit_date from estimate,project where estimate.p_id=project.p_id and estimate.e_id=$1`;
        const out = await db.query(query,[e_id]);
        return out.rows;
    }
    static async getAllProjects() {
        console.log("getProject");
        const query=`select p_id,name,start_date from project;`;
        const out = await db.query(query);
        return out.rows;
    }
}

module.exports = QS;