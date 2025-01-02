trigger countIncrement on OpportunityLineItem (after insert) {

    if(trigger.IsInsert){
        CountInrement.countInre(trigger.new);
    }
}