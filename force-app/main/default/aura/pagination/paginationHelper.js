({
    /* doInitHelper funcation to fetch all records, and set attributes value on component load */
    doInitHelper : function(component,event){ 
        var action = component.get("c.fetchContactWrapper");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                if(oRes.length > 0){
                    component.set('v.listOfAllContacts', oRes);
                    var pageSize = component.get("v.pageSize");
                    var totalRecordsList = oRes;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.listOfAllContacts").length > i){
                            PaginationLst.push(oRes[i]);    
                        } 
                    }
                    component.set('v.PaginationList', PaginationLst);
                    component.set("v.selectedCount" , 0);
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));  
                    
                }else{
                    // if there is no records then display message
                    component.set("v.bNoRecordsFound" , true);
                } 
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action);  
    },
    
    next : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i = end + 1; i < end + pageSize + 1; i++){
            if(sObjectList.length > i){ 
                if(component.find("selectAllId").get("v.value")){
                    Paginationlist.push(sObjectList[i]);
                }else{
                    Paginationlist.push(sObjectList[i]);  
                }
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    
    previous : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                if(component.find("selectAllId").get("v.value")){
                    Paginationlist.push(sObjectList[i]);
                }else{
                    Paginationlist.push(sObjectList[i]); 
                }
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    first: function(cmp){
        var sObjectList = cmp.get("v.listOfAllContacts");
        var end = cmp.get("v.endPage");
        var start = cmp.get("v.startPage"); // 0
        var pageSize = cmp.get("v.pageSize"); //10
        var Paginationlist = [];
        
        for(var i=0; i< pageSize-1; i++){
            if(cmp.get("v.listOfAllContacts").length> i){
                Paginationlist.push(sObjectList[i]);
            }
        }
        cmp.set("v.startPage",0);
        cmp.set("v.endPage",pageSize-1);
        cmp.set('v.PaginationList', Paginationlist);
    },
    last: function(cmp){
        var sObjectList = cmp.get("v.listOfAllContacts");
        var totalrec = cmp.get("v.totalRecordsCount");
        var end = cmp.get("v.endPage");
        var start = cmp.get("v.startPage"); // 0
        var pageSize = cmp.get("v.pageSize"); //10
        var Paginationlist = [];
        
        for(var i=totalrec-pageSize; i< totalrec; i++){
            if(cmp.get("v.listOfAllContacts").length> i){
                Paginationlist.push(sObjectList[i]);
            }
        }
        cmp.set("v.startPage",totalrec-pageSize);
        cmp.set("v.endPage",totalrec);
        cmp.set('v.PaginationList', Paginationlist);
    },
    
})