// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt

frappe.ui.form.on('Work Availability', {
	// refresh: function(frm) {

	// }

	to_date :function(frm){
		 if(frm.doc.from_date > frm.doc.to_date){
			frappe.msgprint("fromDate should be less than toDate");
			frm.set_value("to_date","")
			frm.refresh_field("to_date")
		 }
	}
});
