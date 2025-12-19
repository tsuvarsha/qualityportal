sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator"
], function (Controller, History, JSONModel, MessageToast, BusyIndicator) {
    "use strict";

    return Controller.extend("project1.controller.Detail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);

            var oLocalModel = new JSONModel({
                unrestricted: 0,
                blocked: 0,
                production: 0,
                totalInspected: 0,
                isValid: false,
                validationMessage: ""
            });
            this.getView().setModel(oLocalModel, "local");
        },

        _onObjectMatched: function (oEvent) {
            var sLotId = oEvent.getParameter("arguments").lotId;
            var sPath = "/ZINSPECT_TATA('" + sLotId + "')";

            this.getView().bindElement({
                path: sPath,
                model: "inspection"
            });

            // Reset local model
            var oLocalModel = this.getView().getModel("local");
            oLocalModel.setData({
                unrestricted: 0,
                blocked: 0,
                production: 0,
                totalInspected: 0,
                isValid: false,
                validationMessage: "Please record results."
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("InspectionLot", {}, true);
            }
        },

        onQuantityChange: function () {
            var oLocalModel = this.getView().getModel("local");
            var fUnrestricted = parseFloat(oLocalModel.getProperty("/unrestricted")) || 0;
            var fBlocked = parseFloat(oLocalModel.getProperty("/blocked")) || 0;
            var fProduction = parseFloat(oLocalModel.getProperty("/production")) || 0;

            var fTotal = fUnrestricted + fBlocked + fProduction;
            oLocalModel.setProperty("/totalInspected", fTotal);

            var fActual = parseFloat(this.getView().getBindingContext("inspection").getProperty("ActualQuantity"));

            if (fTotal === fActual) {
                oLocalModel.setProperty("/isValid", true);
                oLocalModel.setProperty("/validationMessage", "Quantities match. Ready for decision.");
            } else {
                oLocalModel.setProperty("/isValid", false);
                oLocalModel.setProperty("/validationMessage", "Total " + fTotal + " does not match Actual " + fActual);
            }
        },

        _updateDecision: function (sCode) {
            var oModel = this.getView().getModel("inspection");
            var sPath = this.getView().getBindingContext("inspection").getPath();
            var oLocalModel = this.getView().getModel("local");
            var fTotal = oLocalModel.getProperty("/totalInspected");

            var oData = {
                UsageDecisionCode: sCode,
                UsageDecisionStatus: "Decision Made",
                InspectedQuantity: fTotal.toString() // Assuming we update this
            };

            BusyIndicator.show();
            oModel.update(sPath, oData, {
                success: function () {
                    BusyIndicator.hide();
                    MessageToast.show("Decision Saved Successfully");
                    this.onNavBack();
                }.bind(this),
                error: function () {
                    BusyIndicator.hide();
                    MessageToast.show("Error saving decision");
                }
            });
        },

        onApprove: function () {
            this._updateDecision("A");
        },

        onReject: function () {
            this._updateDecision("R");
        }
    });
});
