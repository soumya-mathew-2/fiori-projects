sap.ui.define(
    
    [
        "sap/ui/core/format/NumberFormat"
    ],
    function() {
      "use strict";
  
      return {
        
          myformatter:function(empname){
                if(empname){
                    empname = empname.toUpperCase();
                    return empname;
                }
            },
            SalaryFormat:function(empsalary,currency){
                if(empsalary){
                   var currencyFormat = NumberFormat.getCurrencyInstance({
                    currencyCode : false
                   });
                   return currencyFormat.format(empsalary,currency);

            }
        }
        
    }
});