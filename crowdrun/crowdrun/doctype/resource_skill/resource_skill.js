// Copyright (c) 2022, Samarth and contributors
// For license information, please see license.txt

// function get_subCat_Que(field){
// 	const data =[];
//     frappe.db.get_doc('Skill Master',field)
//     .then(doc => {
// 	let cats = doc.custom_category;
// 	cats.map((el)=>{
// 		let d = el.question;
// 		data.push(d.toString())
// 		get_que_options(el.question);
// 	})
//   })
//  // console.log(data)
//  return data;
// }
// function get_que_options(que)
// {
// 	//console.log(que)
// 	const opts=[];
// 	frappe.db.get_doc("Custom User Input",que)
// 	.then(r=>{
// 		let opt_set = r.options;
// 		opt_set.map((od)=>{
// 			opts.push(od.option)
// 		})
// 	})
// 	//console.log(opts)
// 	return opts;
// }
let que =[]
frappe.ui.form.on('Resource Skill', {
	//   const data= get_subCat_Que(frm.doc.skill_master

	 skill_id:(frm)=> {
		 frm.call({
		  method :"get_sub_cats",
		  doc:frm.doc,
		  args:{
			  doctype:"Skill Master",
			  field:frm.doc.skill_id,
		  },
		  callback:(r)=>{
			  console.log(r.message)
			  que =r.message;
			  console.log(que)
			  frm.set_df_property("sub_cat_question","options",r.message);
			  frm.refresh_field("custom_ouput");
		  }
	  });
	},
	sub_cat_question:(frm)=>{
		//console.log(frm.doc.sub_cat_question)
		frm.call({
			method:"get_option",
			doc:frm.doc,
			args:{
				field:frm.doc.sub_cat_question,
			},
			callback:(r)=>{
				console.log(r.message);
				frm.set_df_property("sub_option","options",r.message)
			}
		})
	}
});

frappe.ui.form.on('Custom Ouput',{
	refresh: function(frm,cdt,cdn){
	   console.log("h");
	}
});
// r.message.forEach((el)=>{
// 	frm.add_child("custom_output").question = el;
// })
// frm.refresh_field("custom_output");


