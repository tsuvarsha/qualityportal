sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("project1.controller.InspectionLot", {
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Dashboard", {}, true);
            }
        },

        onPressLot: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext("inspection");
            var sPath = oContext.getPath();
            // Expected path: /ZINSPECT_TATA('...')
            // We want to extract the ID, or just pass the path.
            // Let's pass the encoded path or ID.
            // The pattern: /ZINSPECT_TATA('50000000014')
            var sLotId = oContext.getProperty("InspectionLotNumber");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Detail", {
                lotId: sLotId
            });
        }
    });
});
