trigger InsertProduct on Opportunity (after insert) {
    
    //System.debug(trigger.new);
    Set<Id> pbId=new Set<Id>();
    for(Opportunity op:trigger.new){
        pbId.add(op.Pricebook2Id);
    }
    
    List<PriceBookEntry> pbe =[select Id,Name,Product2Id,
                               ProductCode,UnitPrice,
                               Product2.No_Of_Products_sold__c 
                               from PriceBookEntry where Pricebook2Id=:pbId];
    
    List<OpportunityLineItem>  oplist=new List<OpportunityLineItem>(); //-->Create List to store OpportunityLineItem
    
    for(Opportunity opp: Trigger.New)
    {
        OpportunityLineItem oppli = new OpportunityLineItem(); //---->Create OpportunityLineItem.
        oppli.PricebookEntryId=pbe[0].Id;
        oppli.OpportunityId = opp.Id;
        oppli.Quantity = 5;
        oppli.TotalPrice = 10.0;
        oplist.add(oppli);
    } 
    insert oplist; //----->insert OpportunityLineItem
    
    Set<Id> proId=new Set<Id>();
    for(PriceBookEntry p:pbe){
        proId.add(p.Product2Id);
    }
    List<Product2> pro=[select No_Of_Products_sold__c from product2 where Id=:proId];
    list<product2> proUpdate=new List<product2>();
    for(Opportunity opp: Trigger.New)
    {  
        
        for(Product2 p:pro){
            if(opp.StageName=='Closed Won')
                p.No_Of_Products_sold__c=1;
            else
            {p.No_Of_Products_sold__c=0;}  
            proUpdate.add(p);
        }
    }
    update proUpdate;
}