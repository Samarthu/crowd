// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt

let skills = []
let tools = []

frappe.ui.form.on('Work Allocation', {
	// refresh: function(frm) {

	// }
	
	validate:(frm)=>{
		if(frm.doc.status ==="Completed"){
			frm.set_df_property("status","read_only",1);
		}
	},
	get_resource_skills: (frm) => {
		frm.call({
			method : "get1_skills",
			doc:frm.doc,
			args:{
				doctype :"Resource Skill",
				field : frm.doc.resource_id
			},
			callback: (r) =>{
				//console.log(r.message)
				skills = r.message
				console.log(skills)
				frappe.msgprint({
					title: __('Resource Skill'),
					message: __(JSON.stringify(skills)),
					indicator:'green'
				});				
			}
		})
		
	},
	get_resource_tools:(frm)=>{
		//console.log("hii tools")
		frm.call({
		   method:"get_tools",
		   doc :frm.doc,
		   args:{
			doctype :"Resource Tool",
			field : frm.doc.resource_id
			},
		   callback :(r) => {
			   console.log(r.message)
			   tools = r.message
			   frappe.msgprint({
				title: __('Resource Tools'),
				message: __(JSON.stringify(tools)),
				indicator:'green'
			});	
		   }
		});
		
	}
});
