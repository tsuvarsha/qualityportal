sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.Dashboard", {
        onPressInspectionLot: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("InspectionLot");
        },

        onPressResultRecords: function () {
            // For now navigate to InspectionLot as the entry point
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("InspectionLot");
        },

        onPressUsageDecision: function () {
            // For now navigate to InspectionLot as the entry point
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("InspectionLot");
        }
    });
});
