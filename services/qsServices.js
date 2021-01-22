const QS = require('../models/qs');

class qsService {
    static async showMaterials(){
        return QS.getMaterialValues();
    }

    static async showMaterialtoEstimate(material_name,material_amount){
        return QS.getMaterialtoEstimate(material_name,material_amount);
    }

    static async addNewMaterial({m_name, m_amount, m_cost}){
        return QS.addNewMaterialTodb(m_name, m_amount, m_cost);
    }
    
    static async saveNewEstimate(project_name,estimate_materials){
        return QS.saveNewEstimateTodb(project_name,estimate_materials);
    }

    static async showEstimate({e_id}){
        return QS.getEstimate(e_id);
    }
    
    static async showEst_Project({e_id}){
        return QS.getEst_Project(e_id);
    }
    static async showAllProjects(){
        return QS.getAllProjects();
    }

}

module.exports = qsService;