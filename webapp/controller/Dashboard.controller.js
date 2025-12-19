sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.Dashboard", {
        onInit: function () {
            // Dashboard Controller Initialized
        },

        onPressInspectionLot: function () {
            // Optional: Filter table or just focus it
            var oTable = this.byId("inspectionTable");
            if (oTable) {
                // Just scroll to table or logic if needed
            }
        },

        onPressLot: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext("inspection");
            // The property is InspectionLotNumber based on OData
            var sLotId = oContext.getProperty("InspectionLotNumber");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Detail", {
                lotId: sLotId
            });
        }
    });
});
