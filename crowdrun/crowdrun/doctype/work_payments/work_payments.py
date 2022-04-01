# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document

class WorkPayments(Document):
    @frappe.whitelist()
    def make_transaction(self,doctype,field):
        work_tran_doc = frappe.new_doc(doctype)
        work_tran_doc.work_allocation = field
        work_tran_doc.insert()
        frappe.db.commit()
        
        res_wallet1 = frappe.get_list("Resource Wallet",filters = {'name' : self.resource_id})
        if(res_wallet1):
            res_w = frappe.get_doc("Resource Wallet", res_wallet1[0])
            res_w.er_points+=float(self.er_points)
            res_w.indian_currency = (res_w.er_points / 5)
            res_w.append("transaction_history",{
			"payment_from": self.work_id,
            "payment_to":self.resource_id,
            "amount" : self.er_points,
            "transaction_type": "Credit",
            "type_of_payment" : "via points"
		     })
            res_w.save()
        else:
            res_wallet = frappe.new_doc("Resource Wallet")
            res_wallet.resource_id = self.resource_id
            res_wallet.er_points += float(self.er_points)
            res_wallet.indian_currency = (res_wallet.er_points / 5)
            res_wallet.append("transaction_history",{
			"payment_from": self.work_id,
            "payment_to":self.resource_id,
            "amount" : self.er_points,
            "transaction_type": "Credit",
            "type_of_payment" : "via points",
			})
            res_wallet.save()
            frappe.db.commit()    
        return "success"
        
    
	
