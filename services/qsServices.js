const QS = require('../models/qs');

class qsService {
    static async showMaterials(){
        return QS.getMaterialValues();
    }
    static async addNewMaterial({m_name, m_amount, m_cost}){
        return QS.addNewMaterialTodb(m_name, m_amount, m_cost);
    }
    
    

}

module.exports = qsService;