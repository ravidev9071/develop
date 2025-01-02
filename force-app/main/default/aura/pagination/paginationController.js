({
    doInit: function(component, event, helper) {
        helper.doInitHelper(component, event);
    },
    firstpage: function (component,event,helper) {
        component.set("v.currentPage", 0);
        helper.first(component);
    },
    lastpage: function (component,event,helper) {
        var pageNumber = component.get("v.totalPagesCount");
        component.set("v.currentPage", pageNumber);
        helper.last(component);
    },
    
    navigation: function(component, event, helper) {
        var sObjectList = component.get("v.listOfAllContacts");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var whichBtn = event.getSource().get("v.name");
        // check if whichBtn value is 'next' then call 'next' helper method
        if (whichBtn == 'next') {
            component.set("v.currentPage", component.get("v.currentPage") + 1);
            helper.next(component, event, sObjectList, end, start, pageSize);
        }
        // check if whichBtn value is 'previous' then call 'previous' helper method
        else if (whichBtn == 'previous') {
            component.set("v.currentPage", component.get("v.currentPage") - 1);
            helper.previous(component, event, sObjectList, end, start, pageSize);
        }
    },
    
    selectAllCheckbox: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var updatedAllRecords = [];
        var updatedPaginationList = [];
        var listOfAllContacts = component.get("v.listOfAllContacts");
        var PaginationList = component.get("v.PaginationList");
        
        // play a for loop on all records list 
        for (var i = 0; i < listOfAllContacts.length; i++) {
            // check if header checkbox is 'true' then update all checkbox with true and update selected records count
            // else update all records with false and set selectedCount with 0  
            if (selectedHeaderCheck == true) {
                listOfAllContacts[i].isChecked = true;
                component.set("v.selectedCount", listOfAllContacts.length);
            } else {
                listOfAllContacts[i].isChecked = false;
                component.set("v.selectedCount", 0);
            }
            updatedAllRecords.push(listOfAllContacts[i]);
        }
        // update the checkbox for 'PaginationList' based on header checbox 
        for (var i = 0; i < PaginationList.length; i++) {
            if (selectedHeaderCheck == true) {
                PaginationList[i].isChecked = true;
            } else {
                PaginationList[i].isChecked = false;
            }
            updatedPaginationList.push(PaginationList[i]);
        }
        component.set("v.listOfAllContacts", updatedAllRecords);
        component.set("v.PaginationList", updatedPaginationList);
    },
    
    checkboxSelect: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var selectedRec = event.getSource().get("v.value");
        var getSelectedNumber = component.get("v.selectedCount");
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
            component.find("selectAllId").set("v.value", false);
        }
        component.set("v.selectedCount", getSelectedNumber);
        // if all checkboxes are checked then set header checkbox with true   
        if (getSelectedNumber == component.get("v.totalRecordsCount")) {
            component.find("selectAllId").set("v.value", true);
        }
    },
    /* Update field for selected records */
    updateFields: function(component, event, helper) {
        var allRecords = component.get("v.listOfAllContacts");
        var selectedRecords = [];
        for (var i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isChecked) {
                selectedRecords.push(allRecords[i].objContact.Id);
            }
        }
        component.set('v.selectedContacts', selectedRecords);
        var action = component.get("c.updateRecord");      
        action.setParams({ lstRecordId : component.get('v.selectedContacts') });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(state);
                $A.get('e.force:refreshView').fire();
               component.set("v.currentPage", 0);
            }
        });
        $A.enqueueAction(action);
    },
})