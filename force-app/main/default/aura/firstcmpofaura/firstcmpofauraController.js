({
    init : function(cmp, event, helper) {
        
        var action=cmp.get("c.getDetails");
        
        action.setCallback(this,function(res){
            var data=res.getReturnValue();
            
            cmp.set('v.accData',data);
            
            
        });
        
        $A.enqueueAction(action);
        
        
    },
    
    
    remove:function(cmp,event){
        var selectedItem = event.currentTarget;
        
        var index = selectedItem.dataset.record;
        
        var recId = event.currentTarget.dataset.id;
        
        
        var action =cmp.get("c.deleteRecord");
        action.setParam('id',index);
        
        action.setCallback(this,function(r){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                'type': 'success',
                "message": "Account "+ recId +" was deleted.",
                messageTemplate: 'Account '+ recId +' was deleted. {1}',
                messageTemplateData: ['Salesforce', {
                    url: 'https://trailheadcom-32c-dev-ed.develop.lightning.force.com/lightning/n/Aura',
                    label: 'Undo',
                    executionComponent: {
                        descriptor: "markup://force:showToast",
                        attributes: {mode: 'sticky', message:""+recId+" was restored.",'type': 'success',},
                        isEvent: true,
                        isClientSideCreatable: true,
                        componentName: 'showToast'
                        
                    }
                              
  
                }],
            });
            toastEvent.fire();
            
            $A.get('e.force:refreshView').fire();
            
        });
        
        
        $A.enqueueAction(action);  
        // $A.get('e.force:refreshView').fire();
        
    }
    
})