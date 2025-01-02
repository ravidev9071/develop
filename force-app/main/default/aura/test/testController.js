({
    Accountcontroller : function(component, event, helper) {
        var action = component.get("c.fetchAccountRecords");
        action.setCallback(this,function(a){
            var rs=a.getReturnValue();
            component.set("v.accountContactWrapper",rs);
            
            
            console.log(rs);
        });
        $A.enqueueAction(action);
    },
    onCheck : function(component, event, helper) {
        var selectedRows = event.getSource().get("v.label");
        
        
        var contactList = component.get("v.accountContactWrapper");
       // alert(contactList);
        var selectedContacts = [];
        var k = 0;
            for (var i=0; i<contactList.length; i++){
                var c = contactList[i];
                        //alert(c);

                if(c.selected) {
                    selectedContacts[k] = c;
                    k++; 
                }     
            }
        var contactRecords = JSON.stringify(selectedContacts);
        
        
        var action = component.get("c.ttt");
         action.setParams({
                contactRecords : contactRecords
            });
        action.setCallback(this,function(a){
            var rs=a.getReturnValue();
            component.set("v.ShowRecords",rs);
        });
        $A.enqueueAction(action);
        
    }
    
})