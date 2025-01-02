trigger NumberOfProductsold on Opportunity (after update) {

    if(trigger.isupdate){
        NoOfProducts.ProductSolds(trigger.new);
    }
    
}