trigger SendAccountData on Account (After insert) {

    if(trigger.IsInsert){
        
        Set<Id> accId=new Set<Id>();
        for(Account acc:trigger.new){
            accId.add(acc.Id);
            AccountSendHelper.Helper(acc.Name);
        }
        
    }
    
}