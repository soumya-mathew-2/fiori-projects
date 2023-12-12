sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,Fragment) {
        "use strict";

        return Controller.extend("com.applexus.practice1.controller.Practice", {
            onInit: function () {
                this.onReadData();

            },
            onReadData:function(){
                var oDatamodel = this.getOwnerComponent().getModel();
                var oJsonModel = new sap.ui.model.json.JSONModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title:"Loading Data",
                    text: "Please Wait...",
                    customIcon: "../css/loading.png"

                });
                var oFilter =new sap.ui.model.Filter({
                    path:'Carrid',
                    operator:"EQ",
                    value1:"AA"
                })
                oBusyDialog.open();
                oDatamodel.read("/zb14_07_flightSet",{
                    filters:[oFilter],
                    success:function(oresponce){
                        oJsonModel .setProperty("/NewData",oresponce.results);
                        this.getView().setModel(oJsonModel,"oNewJSONModel");
                        oBusyDialog.close();

                    }.bind(this),
                    error:function(oerror){
                        oBusyDialog.close();
                    }
                });
            },
            onDelete:function(oEvent){
                var oContext =oEvent.getSource().getBindingContext('oNewJSONModel').getObject();
                MessageBox.confirm("are you sure to delete this record?", {
                    title: "Confirm",                                    
                    onClose: function(sAction){
                        if(sAction=== 'OK'){
                            this.onSelectRecord(oContext);
                        }
                    }.bind(this),                                                                          
                    actions: [ sap.m.MessageBox.Action.OK,
                               sap.m.MessageBox.Action.CANCEL ],         
                    emphasizedAction: sap.m.MessageBox.Action.OK,        
                });
            },
            onSelectRecord:function(oRecord){
                var oDatamodel = this.getOwnerComponent().getModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title:"Deleting  Record",
                    text: "Please Wait...",
                    customIcon: "../css/loading.png"

                });
                oBusyDialog.open();
                oDatamodel.remove("/zb14_07_flightSet(Carrid='"+ oRecord.Carrid +"',Connid='"+ oRecord.Connid +"')",{
                    
                    success:function(oresponce){
                        
                        oBusyDialog.close();
                        this.onReadData();

                    }.bind(this),
                    error:function(oerror){
                        oBusyDialog.close();
                        
                    }
                });

            },
            onUpdate:function(oEvent){
                var oContext =oEvent.getSource().getBindingContext('oNewJSONModel').getObject();
                // var oLoad ={
                // "Carrid": oContext.Carrid,
                // "Connid": oContext.Connid,
                // "Cityfrom": oContext.Cityfrom,
                // "Cityto":oContext.Cityto,
                // "Fltype": oContext.Fltype
                // };
                
                if(!this.oDialog){ 
                Fragment.load({
                    name:"com.applexus.practice1.fragments.update",
                    controller:this
                }).then(function(oDialog){
                    this.oDialog =oDialog;
                    this.oDialog.setModel(new sap.ui.model.json.JSONModel({
                        "oLoad": oContext
                    }),"oLoadModel");
                    this.oDialog.open();
                }.bind(this));

            }else{
                this.oDialog.setModel(new sap.ui.model.json.JSONModel({
                    "oLoad": oContext
                }),"oLoadModel");
                this.oDialog.open();
            }
        },
        onSave:function(){
            var oDatamodel = this.getOwnerComponent().getModel();
            var oRecord =this.oDialog.getModel('oLoadModel').getProperty("/oLoad");
            var oBusyDialog = new sap.m.BusyDialog({
                title:"Updating  Record",
                text: "Please Wait...",
                customIcon: "../css/loading.png"

            });
            oBusyDialog.open();
            oDatamodel.update("/zb14_07_flightSet(Carrid='"+ oRecord.Carrid +"',Connid='"+ oRecord.Connid +"')",oRecord,{
                
                success:function(oresponce){
                    
                    oBusyDialog.close();
                    this.onReadData();

                }.bind(this),
                error:function(oerror){
                    oBusyDialog.close();
                    
                }
            });
            
        },
        onCancel: function(){
            this.oDialog.close();

        }
            
        });
    });
