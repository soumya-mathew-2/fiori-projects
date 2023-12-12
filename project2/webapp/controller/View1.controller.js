sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("com.applexus.project2.controller.View1", {
            onInit: function () {
                this.readFlightData();
            },
            readFlightData: function(){
                debugger;
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oFilter = new sap.ui.model.Filter({
                    path : 'Carrid',
                    operator : "EQ",
                    value1 : 'AA'
                });
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.read("/FlightSet",{
                    filters: [oFilter],
                    success: function(response){
                        oBusyDialog.close();
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel,"FlightDataModel")
                    }.bind(this),
                    error: function(error){
                        oBusyDialog.close();
                    }
                })
            },
            onDelete: function(oEvent){
                var oContext = oEvent.getSource().getBindingContext("FlightDataModel").getObject();
                MessageBox.confirm("Are you sure...?", {
                    title: "Confirm",
                    onClose: function(sAction){
                        if(sAction === 'YES'){
                            this.onDeleteRecord(oContext);
                        }
                    }.bind(this),  
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],                                                                          
                    emphasizedAction: sap.m.MessageBox.Action.YES,
                });
            },
            onDeleteRecord: function(oRecord){
                var oModel = this.getOwnerComponent().getModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Deleting Record",
                    text: "Please Wait..."
                });
                oBusyDialog.open()
                oModel.remove("/FlightSet(Carrid='"+ oRecord.Carrid +"',Connid='"+ oRecord.Connid +"')",{
                    success: function(response){
                        oBusyDialog.close();
                        this.readFlightData();
                    }.bind(this),
                    error: function(error){
                        oBusyDialog.close();
                    }
                })
            },
            onUpdate:function(oEvent){
                var oContext = oEvent.getSource().getBindingContext("FlightDataModel").getObject();
                // var oPayload = {
                //     "Carrid"    :oContext.Carrid,
                //     "Connid"    :oContext.Connid,
                //     "CustomerId":oContext.CustomerId,
                //     "Smoker"    :oContext.Smoker,
                //     "Class"     :oContext.Class
                // };
                if(!this.oDialog){
                    Fragment.load({
                        name: "com.applexus.project2.fragments.updateDialog", controller:this
                    }).then(function(oDialog){
                        this.oDialog = oDialog;
                        this.oDialog.setModel(new sap.ui.model.json.JSONModel({
                            "oPayload" : oContext
                        }),"oPayloadModel");
                        this.oDialog.open();
                    }.bind(this));
                }else{
                    this.oDialog.setModel(new sap.ui.model.json.JSONModel({
                        "oPayload" : oPayload
                    }),"oPayloadModel");
                    this.oDialog.open();
                }  
            },
            onCreate: function(){
                if(!this.oDialog2){
                    Fragment.load({
                        name: "com.applexus.project2.fragments.createDialog", controller:this
                    }).then(function(oDialog2){
                        this.oDialog2 = oDialog2;
                        this.oDialog2.open();
                    }.bind(this));
                }else{
                    this.oDialog2.open();
                }  
            },
            onSave: function(){
                var oModel = this.getOwnerComponent().getModel();
                var oRecord = this.oDialog.getModel('oPayloadModel').getProperty("/oPayload");
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Updating Record",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
            
                oModel.update("/FlightSet(Carrid='"+ oRecord.Carrid +"',Connid='"+ oRecord.Connid +"')",oRecord,{
                    success: function(response){
                        oBusyDialog.close();
                        this.oDialog.close();
                        this.readFlightData();
                    }.bind(this),
                    error: function(error){
                        oBusyDialog.close();
                    }
                });
            },
            onPressSave: function(){
                var oModel = this.getOwnerComponent().getModel();
                var carrid = sap.ui.getCore().byId("_IDGenInput4").getValue();
                var connid = sap.ui.getCore().byId("_IDGenInput5").getValue();
                var customer_id = sap.ui.getCore().byId("_IDGenInput1").getValue();
                var _class = sap.ui.getCore().byId("_IDGenInput3").getValue();
                var flightData = {};
                flightData.Carrid = carrid;
                flightData.Connid = connid;
                flightData.CustomerId = customer_id;
                flightData.Class = _class;
                oModel.create("/FlightSet", flightData, {
                    success: function(response){
                    this.oDialog2.close();
                    this.readFlightData();
                    }.bind(this),
                    error: function(error){
                    }
                })
            },
            onCancel: function(){
                this.oDialog.close();
            },
            onPressCancel: function(){
                this.oDialog2.close();
            }
        });
    });
