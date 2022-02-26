# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ResourceSkill(Document):
    @frappe.whitelist()
    def get_sub_cats(self,doctype,field,as_dict = 1):
        data=frappe.get_doc(doctype,field)
        r = []
        for d in data.custom_category:
            r.append(d.question)
        #     self.append(("custom_ouput"),
        #                 {
        #                     "question": d.question
        #                 }
        #                 )
        return r


    # @frappe.whitelist()    
    # def get_option(self,field):
    #     doc=frappe.get_doc('Custom User Input',field)
    #     r1=[]
    #     for d in doc.options:
    #         r1.append(d.option)
    #     return r1    
    
	# def get_options(field,as_dict=1):
    # doc = frappe.get_doc('Custom User Input', field)
    # r1 = []
    # for d in doc.options:
    #     r1.append(d.option)
    # return r1

	#pass
    # @frappe.whitelist()
	
	# 	data =frappe.get_doc(doctype,field)
	# 	r = []
	# 	for d in data.custom_category:
	# 		r.append(d.question)
	# 		self.append(("custom_ouput"),{"question": d.question})
	# 	return r


    # def get_options(field,as_dict=1):
    #     doc = frappe.get_doc("Custom User Input",field)
    #     r1 = []
	#     for d in doc:
    #         r1.append(d.option)
	# 	return r1

		

