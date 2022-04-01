# Copyright (c) 2022, Samarth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import datetime
from datetime import datetime as dt

class WorkTemplate(Document):
    def get_all_resource(self):
        return frappe.db.get_list("Resource", fields="name",pluck="name")
    
    def get_resource_details(self,field):
        return frappe.db.get_list("Resource",fields=["*"],filters = {'name' : field})
    
    def get_skills(self,res):
        rskills=[]
        r_skill = frappe.db.get_list("Resource Skill",fields=['skill_id'] ,filters={'resource': res})
        for skill in r_skill:
            rskills.append(skill.skill_id)
        return rskills 
    
    def get_tools(self,res):
        rtools =[]
        r_tool = frappe.db.get_list("Resource Tool",fields=["tool_id"],filters={'resource': res}) 
        for tool in r_tool:
            rtools.append(tool.tool_id)
        return rtools   
      
    def get_skills_tools(self,res):
        rskills =[]
        rtools =[]
        r_skill = frappe.db.get_list("Resource Skill",fields=['skill_id'] ,filters={'resource': res})
        
        for skill in r_skill:
            rskills.append(skill.skill_id)
            
        r_tool = frappe.db.get_list("Resource Tool",fields=["tool_id"],filters={'resource': res}) 
        for tool in r_tool:
            rtools.append(tool.tool_id)
             
        return {'skills':rskills , "tools" : rtools}
    
    def get_available_skill_list(self,skills,rl):
        res=[]
        for r in rl:
            rs = frappe.db.get_list("Resource Skill", fields=["skill_id"],pluck="skill_id",
                                     filters={'resource' : r})
            if (len(rs) > 0) and all( item in rs for item in skills):
                if r not in res:
                    res.append(r)
        return res
    
    def get_available_tool_list(self,tools,rl):
        rest=[]
        for r in rl:
            rt = frappe.db.get_list("Resource Tool", fields=["tool_id"],pluck="tool_id",filters={"resource" :r})
            if (len(rt)>0) and all(i in rt for i in tools):
                if r not in rest:
                    rest.append(r)
        return rest
    
    def get_days(self,arr):
        days={} 
        for i in arr:
            days[i.day] = [i.start_time,i.end_time]
        return days    
        
    def get_res_availability_list(self,field):
        resource =[]
        f =0
        wa = frappe.get_doc("Work Availability" , field)
        w = self.get_days(wa.weekly_requirement)
        rl = frappe.db.get_list("Resource Availability" , fields=["resource","location","name","creation"],
                                   filters=[['from_date' ,'>=', wa.from_date],['to_date','<=', wa.to_date],
                                            ['location','=',wa.location]]) 
        for r in rl:
            doc_d = frappe.db.get_list("Weekly Days" ,fields=["*"], filters={'parent' : r.name, 'creation':r.creation})
            for d in doc_d:
                if(d.day in w.keys()):
                    f=1
                    # Times range of resource and work
                    wst = w[d.day][0]
                    wet = w[d.day][1]
                    rst = d.start_time
                    ret = d.end_time
                    
                    if((wst <= rst ) and (wet >= ret)):
                        if(r.resource not in resource):
                            resource.append(r.resource)
                    else:
                        frappe.throw("Resource start time and end time not matches")
                elif f==0:
                    frappe.throw("Resource working days are not matching")
        
        return resource            
    
                            
    def on_submit(self):
        all_res_list = self.get_all_resource()
        work_skills=[]
        work_tools=[]
        ## adding mandatory skill to skills[]
        for i in self.skill_required:
            if(i.mandatory):
                work_skills.append(i.skill_id)
        ## adding mandatory tools to tools[]        
        for t in self.tool_required:
            if(t.mandatory):
                work_tools.append(t.tool_id)            
                
        res_tools_list  = self.get_available_tool_list(work_tools,all_res_list)
        res_skills_list = self.get_available_skill_list(work_skills,all_res_list)
        res_availability_list = self.get_res_availability_list(self.work_availability)
        # frappe.msgprint(res_skills_list)
        # frappe.msgprint(res_availability_list)
        
        availble_resource_list = []
        flag = 0
        
        # main mapping is done here....
        for r in res_availability_list:
            if((r in res_tools_list) and (r in res_skills_list)):
                flag = 1
                if r not in availble_resource_list:
                    #resource_details = get_resource_details(r)
                    work_allocation = frappe.new_doc("Work Allocation")
                    work_allocation.work_template_id = self.name 
                    work_allocation.resource_id = r
                    work_allocation.status = "Matched"
                    work_allocation.insert()
                    frappe.db.commit()
                    availble_resource_list.append(r)          
        if(flag== 0 ):
            frappe.throw("No Resource is avalaible")
        else:
            frappe.throw(availble_resource_list)        
            
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                            
                        
                    
                        
                         
                        
                        
                    
                               
                            
        
       
       
       
       
       
       
       
       
       
       
  
  
