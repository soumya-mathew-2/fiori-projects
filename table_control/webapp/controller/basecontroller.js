sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.applexus.tablecontrol.controller.baseController", {
        onInit() {
        },
        getpath: function(oEvent){
            var fruitid = oEvent.getParameter("arguments").item;
          var sPath = "fruit>/fruit/"+fruitid;
          return sPath;

          
        }
      });
    }
  );