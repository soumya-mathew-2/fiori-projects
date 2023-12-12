sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.applexus.project1.controller.homepage", {
            onInit: function () {

            },
            onSubmit:function(){ 
                 this.getView().byId("input1").setValue(Math.floor(Math.random()*100));
                 this.getView().byId("input2").setValue(Math.random());
                 this.getView().byId("input3").setValue(10);
                 this.getView().byId("input4").setValue(Math.random());

            }
        });
    });
