// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bank Details', {
	// refresh: function(frm) {

	// }
	
	upi:function(frm){
		var sam = "sama";
		if(frm.doc.upi)
		{
			frm.set_df_property("upi_id","hidden",0);
		}
		else{
			frm.set_df_property("upi_id","hidden",1);
		}

	}
});
