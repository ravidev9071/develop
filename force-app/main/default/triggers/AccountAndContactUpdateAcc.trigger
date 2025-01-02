trigger AccountAndContactUpdateAcc on Account (before delete) {
    
    
    
    if(trigger.isDelete){
        //AccountAndContactHandlerClass.AccountAndContactHandler(trigger.old);
    }
    
    
}