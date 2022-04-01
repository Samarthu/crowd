# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class WorkAllocation(Document):        
    @frappe.whitelist()
    def get_tools(self,doctype,field):
        return frappe.db.get_list(doctype,fields = ["tool_id",'tool_name'] , filters={'resource':field })
    
    @frappe.whitelist()	
    def get1_skills(self,doctype,field):
        return frappe.db.get_list(doctype,fields=['skill_id','skill_name'] ,filters={'resource':field })
       