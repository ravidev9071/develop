trigger AccountAndContactUpdate on Contact (before insert) {
   
    if(trigger.isinsert){
        AccountAndContactHandlerClass.AccountAndContactHandler(trigger.new);
    }
   
    
    
}