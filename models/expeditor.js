const { types } = require('joi');
const db = require('../config/db');
class expeditor {
    static async getAllprojects() {
        console.log("getallprojects");
        const query=`SELECT name FROM project`;
        const out = await db.query(query);
        return out.rows;
    }
    
    static async getMaterialValues() {
        console.log("getMaterialValues");
        const query=`SELECT * FROM materialvalue`;
        const out = await db.query(query);
        return out.rows;
    }
    
    static async getProjectId(p_name) {
        console.log("getProjectId");
        const query=`SELECT p_id FROM project WHERE name = $1`;
        const out = await db.query(query,[p_name]);
        // console.log(out.rows);
        return out.rows[0];
    } 
    
    static async addToMaterialOrder(project_id, orderDate) {
        console.log("addToMaterialOrder");
        const query=`INSERT INTO Material_Order (P_id, order_date, ordered, received)
                     VALUES($1,$2,$3,$4)
                     RETURNING O_id;`;
        const out = await db.query(query,[project_id, orderDate, 'no', 'yes']);
        return out.rows[0];
    }
    
    static async addToOrderItems(final_materials, final_quantiies,o_id) {
        console.log("addToOrderItems");
        const query=`CALL addOrderItems($1,$2,$3)`;
        const out = await db.query(query,[final_materials, final_quantiies, o_id]);
        // console.log(out.rows);
        return out.rows;
    }

    // static async getEstimate() {
    //     console.log("getEstimate");
    //     const query=`select materialvalue.m_name,materialvalue.m_amount,quantity,m_cost from estimate,est_mat,materialvalue where estimate.e_id=est_mat.e_id and est_mat.m_id=materialvalue.m_id and estimate.e_id=1;`;
    //     const out = await db.query(query);
    //     return out.rows;
    // }

}

module.exports = expeditor;