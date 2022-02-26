# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ResourceTool(Document):
    #pass 
    @frappe.whitelist()
    def get_specific_question(self,doctype,field,as_dict = 1):
        data=frappe.get_doc(doctype,field)
        r = []
        for d in data.specific_details:
            r.append(d.question)
        return r;    
        
