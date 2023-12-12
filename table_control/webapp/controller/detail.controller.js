sap.ui.define(
  [
    "com/applexus/tablecontrol/controller/basecontroller",
    'sap/ui/core/Fragment'
  ],
  function (BaseController,Fragment) {
    "use strict";

    return BaseController.extend("com.applexus.tablecontrol.controller.detail", {
      onInit() {
        this.router = this.getOwnerComponent().getRouter();
        this.router.getRoute("Detail").attachPatternMatched(this.herculis, this)
      },
      herculis: function (oEvent) {
        // var fruitid = oEvent.getParameter("arguments").item;

        // var sPath = "fruit>/fruit/"+fruitid;
        var sPath = this.getpath(oEvent);

        this.getView().byId("mySimpleForm").bindElement(sPath);

      },
      onFilterSelect: function (oEvent) {
        var source = oEvent.getSource();
        var selectedKey = source.mProperties.selectedKey;
        console.log(selectedKey);

      },
      onValueHelpRequested: function(oEvent){
        var oView = this.getView();

        this.selectedField = oEvent.getSource();
    if (!this._pValueHelpDialog) {
        this._pValueHelpDialog = Fragment.load({
            id: oView.getId(),
            name: "com.applexus.tablecontrol.Fragments.popup",
            controller: this
        }).then(function (oValueHelpDialog){
            oView.addDependent(oValueHelpDialog);
            oValueHelpDialog.bindAggregation("items",{
                path: 'fruit>/supplier',
                template:new sap.m.DisplayListItem({
                  label:"{fruit>City}",
                    value:"{fruit>City}"

                })
            })
            return oValueHelpDialog;
        });                

       

    }

    this._pValueHelpDialog.then(function(oValueHelpDialog){

        // this._configValueHelpDialog();

        oValueHelpDialog.open();

    }.bind(this));



    }  ,

    onConfirm: function(oEvent){
      console.log(oEvent);
        let supplier = oEvent.mParameters.selectedItem.mProperties.value;
        this.selectedField.setValue(supplier);

    }
    });
  }
);