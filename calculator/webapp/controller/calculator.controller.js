sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.applexus.calculator.controller.calculator", {
        onInit: function () {
            var oData = {
              display: "0",
              firstOperand: null,
              operator: null,
              clearDisplay: false
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
          },
      
          onPress: function (oEvent) {
            var sButtonValue = oEvent.getSource().getText();
            var oModel = this.getView().getModel();
            var sCurrentValue = oModel.getProperty("/display");
            var bClearDisplay = oModel.getProperty("/clearDisplay");
      
            if (bClearDisplay || sCurrentValue === "0") {
              oModel.setProperty("/display", sButtonValue);
              oModel.setProperty("/clearDisplay", false);
            } else {
              oModel.setProperty("/display", sCurrentValue + sButtonValue);
            }
          },
      
          onOperator: function (oEvent) {
            var sOperator = oEvent.getSource().getText();
            var oModel = this.getView().getModel();
            var sCurrentValue = oModel.getProperty("/display");
            oModel.setProperty("/firstOperand", parseFloat(sCurrentValue));
            oModel.setProperty("/operator", sOperator);
            oModel.setProperty("/clearDisplay", true);
          },
      
          onClear: function () {
            var oModel = this.getView().getModel();
            oModel.setProperty("/display", "0");
            oModel.setProperty("/firstOperand", null);
            oModel.setProperty("/operator", null);
          },
      
          onCalculate: function () {
            var oModel = this.getView().getModel();
            var sOperator = oModel.getProperty("/operator");
            var sFirstOperand = oModel.getProperty("/firstOperand");
            var sCurrentValue = parseFloat(oModel.getProperty("/display"));
      
            if (!isNaN(sFirstOperand) && !isNaN(sCurrentValue) && sOperator) {
              switch (sOperator) {
                case "+":
                  oModel.setProperty("/display", (sFirstOperand + sCurrentValue).toString());
                  break;
                case "-":
                  oModel.setProperty("/display", (sFirstOperand - sCurrentValue).toString());
                  break;
                case "*":
                  oModel.setProperty("/display", (sFirstOperand * sCurrentValue).toString());
                  break;
                case "/":
                  if (sCurrentValue !== 0) {
                    oModel.setProperty("/display", (sFirstOperand / sCurrentValue).toString());
                  } else {
                    oModel.setProperty("/display", "Error");
                  }
                  break;
                default:
                  break;
              }
              oModel.setProperty("/firstOperand", null);
              oModel.setProperty("/operator", null);
              oModel.setProperty("/clearDisplay", true);
            }
          }
        });
      });