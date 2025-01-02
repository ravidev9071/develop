({
	 Accounthelpermethod:function(component,event,helper){
        var action = component.get("c.fetchAccountRecords");
        action.setCallback(this,function(a){
             var rs=a.getReturnValue();
            component.set("v.accountContactWrapper",rs);
            
           
            console.log(rs);
        });
        $A.enqueueAction(action);
    }
})