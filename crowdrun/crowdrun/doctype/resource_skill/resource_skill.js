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
// 	let opts=[];
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
let que =[];
let idx = 0;
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
			  //console.log(r.message)
			  que =r.message;
			  cur_frm.clear_table("custom_output");
			  $.each(r.message,function(_i,e){
				  let entry = frm.add_child("custom_output");
				  entry.question = e;
				  set_options(e)
			  });
            //   set_options(que[idx++]);
		      frm.refresh_field("custom_output");
			  //console.log(que)
			  //frm.set_df_property("sub_cat_question","options",r.message);
			 
		  }
	  });
	},
	refresh:(frm)=>{
		frm.set_df_property("custom_output","read_only", frm.is_new() ? 0 : 1)
	}
	// sub_cat_question:(frm)=>{
		// let d1;
		// //console.log(frm.doc.sub_cat_question)
		// frm.call({
		// 	method:"get_option",
		// 	doc:frm.doc,
		// 	args:{
		// 		field:frm.doc.sub_cat_question,
		// 	},
		// 	callback:(r)=>{
		// 		console.log(r.message);
		// 		frm.set_df_property("sub_option","options",r.message)
		//         // cur_frm.doc.custom_ouput.forEach((v)=>{
		// 		// 	v.select_option.ot
		// 		// }) 
		// 		//df.options = ["sa" , "s" , "sss"]"
		// 		//df.value = "Sam"
		// 	}
		// })
//	}
});
frappe.ui.form.on('Custom Output',{
	select_option:(frm)=>{
		// console.log(que[idx]);
		// // if(!(idx >= que.length)){
		// // 	set_options(que[idx++]);
	    // //  	//frm.refresh_field("custom_ouput");
		// // }
		// var df = frappe.meta.get_docfield("Custom Output","select_option", cur_frm.doc.name);
		// df.options = ["sa" , "s" , "sss"];

	}
});
// r.message.forEach((el)=>{	
// 	frm.add_child("custom_output").question = el;
// })
// frm.refresh_field("custom_output");


