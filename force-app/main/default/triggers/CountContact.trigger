trigger CountContact on Contact (After insert,after Delete) {
    if(trigger.IsInsert){
        CountContact.countCon(trigger.new);
        
    }
    if(trigger.IsDelete){
        
        
        CountContact.countCon(trigger.old);
        
    }
}