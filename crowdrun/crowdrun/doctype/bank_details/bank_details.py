# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class BankDetails(Document):
    def validate(self):
        pass
        # doc = frappe.new_doc("Dummy")
        # doc.name1="sa1m"
        # doc.age = 21
        # doc.append("dum",{'tool': "hd_camera" , "status": True} )
        # doc.append("dum",{'tool': "mobile" , "status": True})
        # doc.save()
        # frappe.db.commit()
        # frappe.throw(doc.name1)
        
        
