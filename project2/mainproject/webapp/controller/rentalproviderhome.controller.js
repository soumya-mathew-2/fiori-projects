sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("com.applexus.mainproject.controller.rentalproviderhome", {
            onInit: function () {

            },
            onchangePress: function() {
                if(!this.changeStatus){
                    this.changeStatus = Fragment.load(
                        { name: "com.applexus.mainproject.Fragments.bookingchange"}
                    );
                }
                this.changeStatus.then(
                    function(oDialog){
                        oDialog.open();
                    });
                },
                onUpdatePress: function(){
                    if(!this.updatehome){
                        this.updatehome = Fragment.load(
                            { name: "com.applexus.mainproject.Fragments.updatehome"}
                        );
                    }
                    this.updatehome.then(
                        function(oDialog2){
                            oDialog2.open();
                        }
                    );
                }
          
        });
    });
