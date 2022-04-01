frappe.listview_settings['Work Template'] = {
    add_fields:["status","resource_id"],
    get_indicator:(doc)=>{
    console.log("yres")
     if (doc.status === "Matched") {
         return [__("Matched"), "green", "status,=,Matched"];
      }
   }
 }