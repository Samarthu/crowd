frappe.listview_settings['Work Allocation'] = {
    add_fields : ["resource_id"],
    get_indicator:(doc)=>{
     if (doc.status === "Matched") {
         return [__("Matched"), "orange", "status,=,Matched"];
      }
      else if(doc.status === "Allocated"){
        return [__("Allocated"), "blue", "status,=,Allocated"];
      }
      else if(doc.status === "Completed"){
        return [__("Completed"), "green", "status,=,Completed"];
      }
   }
 }