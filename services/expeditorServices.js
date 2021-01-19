const expeditor = require('../models/expeditor');

class expeditorService {
    static async getProjects(){
        return expeditor.getAllprojects();
    }

    static async showMaterials(){
        return expeditor.getMaterialValues();
    }
    static async addNewOrder({final_materials,final_quantiies, optionProject}){
        const project_id = await expeditor.getProjectId(optionProject);
        const today = new Date();
        // const day = ("0" + today.getDate()).slice(-2);
        // const month = ("0" + (today.getMonth() + 1)).slice(-2);
        // const year = today.getFullYear();  
        // const orderDate= day + '-' + month + '-' + year;
       
        const o_id =(await expeditor.addToMaterialOrder(project_id.p_id, today)).o_id;
        //  console.log(final_materials);
        //  console.log(final_quantiies[0]);
        try{
        return expeditor.addToOrderItems(final_materials, final_quantiies,o_id);
        }
        catch{
            console.log("errr")
        }
    }
    

    // static async showEstimate(){
    //     return QS.getEstimate();
    // }
    

}

module.exports = expeditorService;