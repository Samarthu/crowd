// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt


function show_alertmsg(msg,color,dur){
	frappe.show_alert({
		message:__(msg),
		indicator:color
	}, dur);
}
function make_transaction(field,resource,amt){
	amt = amt / 5;
	let entry = cur_frm.add_child(field);
	entry.payment_from = resource;
	entry.payment_to = resource;
	entry.amount = amt;
	entry.transaction_type ="Debit";
	entry.type_of_payment = "via cash";
	cur_frm.refresh_fields(field);
	return amt;
}
let amt = ""
frappe.ui.form.on('Resource Wallet', {
	onload:(frm)=>{
		console.log(frm);
		cur_frm.set_df_property("transaction_history", "read_only", 1)
	},
	see_inr_conversion:(frm)=>{
		amt = (frm.doc.er_points / 5)
		frappe.msgprint({
				title: __('You can Redeeem this much'),
				message: __("Rs." +JSON.stringify(amt)),
				indicator:'green'
			});
	},
	er_points:(frm)=>{
	    amt = (frm.doc.er_points / 5)
		frm.set_value("indian_currency", amt)
		cur_frm.refresh_fields("indian_currency")
	},

	redeem:(frm)=>{
		if(frm.doc.enter_redeem_amount >= 1 && frm.doc.enter_redeem_amount <= frm.doc.er_points)
		{
			frappe.confirm("are you sure you want redeem the amount ?",()=>{
			let r_amt = frm.doc.enter_redeem_amount;
			let er_points_amt = frm.doc.er_points;
			er_points_amt -= r_amt;
			frm.set_value("er_points",er_points_amt)
			cur_frm.refresh_fields("er_points")
			frm.set_value("enter_redeem_amount","")
			let amount = make_transaction("transaction_history",frm.doc.resource_id,r_amt);
			show_alertmsg('Hi, You amount ₹' + amount + " is successfully redeemed to Your Bank Account",'green',40);
			cur_frm.save();
			},
			()=>{
				console.log("failed")
			})
		}
		else{
			frappe.throw(__("Please Enter the Redeem Amount greater than zero and less than ER points"));
		}	
 	}
});

