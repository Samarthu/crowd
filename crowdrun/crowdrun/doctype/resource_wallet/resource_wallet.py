# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ResourceWallet(Document):
    @frappe.whitelist()
    def er_point_val(self):
        return frappe.db.get_single_value("ER Points Value","er_point_val")
    
 
