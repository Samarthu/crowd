frappe.listview_settings['Work Allocation'] = {
    add_fields : ["resource_id","status"],
    get_indicator:(doc)=>{
     if (doc.status === "Initiated") {
         return [__("Initiated"), "blue", "status,=,Initiated"];
      }
      else if(doc.status === "Awaiting Approval"){
        return [__("Awaiting Approval"),"blue", "status,=,Awaiting Approval"];
      }
      else if(doc.status === "Pending"){
        return [__("Pending"), "red", "status,=,Pending"];
      }
      else if(doc.status === "Success"){
        return [__("Success"), "green", "status,=,Success"];
      }
   }
 }