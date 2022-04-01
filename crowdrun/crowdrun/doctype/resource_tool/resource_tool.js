// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt



function set_options(field)
{
	var df = frappe.meta.get_docfield("Custom Output","select_option", cur_frm.doc.name);
	let opts = [];
	frappe.db.get_doc("Custom User Input",field)
	.then(r=>{
		 let opt_set = r.options; 
		 opt_set.map((od)=>{
		 	opts.push(od.option)
		 })
	})	
	//console.log(opts)
	df.options = opts;
	cur_frm.refresh_field("custom_output");
	// df.fieldtype = "Select";
	// df.options = opts;
}

frappe.ui.form.on('Resource Tool', {
	refresh:(frm)=>{
		frm.set_df_property("custom_output","read_only", frm.is_new() ? 0 : 1)
	},

	tool_id:(frm)=>{
		//console.log(frm.doc.tool_id)
		frm.call({
			method:"get_specific_question",
			doc : frm.doc,
			args:{
				doctype : "Tool Master",
				field : frm.doc.tool_id
			},
			callback:(r)=>{
				//console.log(r.message);
				cur_frm.clear_table("custom_output");
				$.each(r.message,function(_i,e){
					let entry = frm.add_child("custom_output");
				  entry.question = e;
				  set_options(e)
			     });
		        frm.refresh_field("custom_output");
			}
		});

	}
});
