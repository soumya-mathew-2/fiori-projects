sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.applexus.tablecontrol.controller.list", {
            onInit: function () {
                this.router =this.getOwnerComponent().getRouter();
               

            },
            onFilter: function (oEvent) {
                debugger;
                // build filter array
                var aFilter = [];
                var sQuery = oEvent.getSource().getValue()
                if (sQuery) {

                    var filter1 = new Filter("name", FilterOperator.Contains, sQuery);
                    var filter2 = new Filter("price", FilterOperator.Contains, sQuery);
                    
                    aFilter.push(filter1);
                    aFilter.push(filter2);
                    
                
                    var masterfilter = new Filter({
                        filters: aFilter,
                        and: false
                    })

                    // filter binding
                    var oList = this.byId("_IDGenList1");
                    var oBinding = oList.getBinding("items");
                    oBinding.filter(masterfilter);
                }
            },
            onDelete:function(){
                var oList = this.byId("_IDGenList1");
                console.log(oList);
                var items =oList.getSelectedItems();
                for(var i = 0;i<items.length;i++)
                {
                 
                    oList.removeItem(items[i]);
                }
            
            },
            onNav:function(oEvent){

                var sPath = oEvent.oSource.oBindingContexts.fruit.sPath;
                var item = sPath.split("/")[2];
                this.router.navTo("Detail",{item});
            

                
            }
            
            
        
        });
    });
