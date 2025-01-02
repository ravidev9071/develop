trigger accesslevelchecklineitem on OpportunityLineItem (after insert) {
    
    set<id> proId=new set<id>();
    for(OpportunityLineItem pro:trigger.new){
        proId.add(pro.product2Id);
    }
    
   List<product2> prolist=[select Id,Name,No_Of_Products_sold__c	 from product2 where Id=:proId]; 
    system.debug(prolist);
    
}