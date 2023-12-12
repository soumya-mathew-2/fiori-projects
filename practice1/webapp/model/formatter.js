sap.ui.define(
    [
        "sap/ui/core/format/DateFormat"
    ],
    function(DateFormat) {
      "use strict";
  
      return {
        formatDate: function(licVal) {
            if(licVal){
                var oDateFormat = DateFormat.getDateInstance({
                    pattern: "dd/MM/YYY"
                })
                var oDate = new Date(licVal);
                return oDateFormat.format(oDate);
            }
        }
      }
    }
  );
  