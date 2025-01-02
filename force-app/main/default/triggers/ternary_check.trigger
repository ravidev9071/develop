trigger ternary_check on Account (before insert,before delete) {

   List<Account> acclist=trigger.isInsert?trigger.new:trigger.old;
    
    for(Account ac:acclist){
        System.debug('Ac:::---'+ac);
    } 
    
    
}