trigger XYZcon on Contact (After insert) {
    
    if(trigger.isInsert){
        xyz.ttt(trigger.new);
    }
    
}