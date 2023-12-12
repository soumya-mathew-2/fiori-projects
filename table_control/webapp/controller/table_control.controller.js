sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/models",
    "../model/formatter"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models,formatter) {
        "use strict";

        return Controller.extend("com.applexus.tablecontrol.controller.table_control", {
            formatter: formatter,
            onInit: function () {
                var emp = models.load("../model/sample.json");
                this.getView().setModel(emp);
            },
            onSelect: function(oEvent) {
                var oRow = oEvent.getParameter('rowContext');
                var sPath = oRow.getPath();
                var oSimpleForm = this.getView().byId('mySimpleForm');
                oSimpleForm.bindElement({
                  path: sPath
                });
              },
              
            
        
              
              

        });
    });
