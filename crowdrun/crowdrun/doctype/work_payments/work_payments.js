// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt

frappe.ui.form.on('Work Payments', {
	 refresh:function(frm) {
		if(frm.doc.status === "Success")
		{
			frm.set_df_property("status","read_only",1)
		}
	 },
	make_payment:(frm)=>{
		frappe.confirm('Are you sure you want to make payment?',
    		() => {
                //console.log("success")
				if(frm.doc.status === "Success"){
					frappe.throw(__("Payment Has Already Done"),20);
				}
				else{
					frm.call({
						method:"make_transaction",
						doc :frm.doc,
						args:{
							doctype:"Work Payment Transactions",
							field:frm.doc.work_allocation_id
						},
						callback:(r)=>{
							console.log(r.message);
							cur_frm.set_value("status","Success");
							frm.set_df_property("status","read_only",1);
							frappe.show_alert({
								message:__('Hi, Payment is successfull'),
								indicator:'green'
							}, 30);
							cur_frm.save();
						}
					})
				}
				frm.reload_doc();
    		}, () => {
				cur_frm.refresh();
                console.log(cur_frm.doc)
	      })
	}
});

