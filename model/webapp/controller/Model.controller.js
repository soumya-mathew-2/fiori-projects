sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models) {
        "use strict";
      
        return Controller.extend("com.applexus.model.controller.Model", 
        {
            onInit: function () {
                var emp = models.load("../model/sample.json");
                this.getView().setModel(emp,"put");
                var emp1 = models.load("../model/sample1.json");
                this.getView().setModel(emp1);                
            },
            onPress: function (oEvent) {
                if (oEvent.getSource().getPressed()) {
                  this.getView().byId("_IDGenInput1").bindValue('put>/employees/0/empid');
                  this.getView().byId("_IDGenInput2").bindValue('put>/employees/0/empname');
                  this.getView().byId("_IDGenInput3").bindValue('put>/employees/0/salary');
                }
                else
                {
                  this.getView().byId("_IDGenInput1").bindValue('/employee/0/empid');
                  this.getView().byId("_IDGenInput2").bindValue('/employee/0/empname');
                  this.getView().byId("_IDGenInput3").bindValue('/employee/0/salary');
                }
            }
        });
    });
