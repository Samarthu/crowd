import frappe
import json


def get_payload(payload):
    """
    This method takes input payload of frappe request and converts into actual payload desired to API
    """
    # NEW FRAPPE COMPABILITY
    if payload.get('data'):
        # OLD FRAPPE COMPABILITY
        if(isinstance(payload.get('data'),bytes)):
            payload['data'] = payload['data'].decode('utf-8')
        return json.loads(payload['data'])
    
    # DATA FIELD DOESNOT EX IN PAYLOAD
    # LATTE COMPABILITY
    else:
        return payload

@frappe.whitelist()
def get_resource():
    return frappe.db.sql(f""" SELECT first_name,full_name from `tabResource`;""",as_dict =1 )


#resource="bhushan-26"
@frappe.whitelist()
def get_avalability(resource):
    res = frappe.db.sql(f"""select * from `tabResource Availability` where resource ='{resource}' ;""",as_dict=1)
    return res 

@frappe.whitelist()
def change_workAllocation_status(**krgs):
    
    data = get_payload(krgs)
    doc = frappe.get_doc("Work Allocation" ,data['work_allocation_id'])
    doc.status = data['status']
    doc.save()
    if(doc.status == "Completed"):
        wp_doc = frappe.new_doc("Work Payments")
        wp_doc.work_allocation_id = data['work_allocation_id']
        wp_doc.status = "Initiated"
        wp_doc.er_points = data['er_points']
        wp_doc.insert()
        frappe.db.commit()
        
    return "success"
    
    