sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("project1.controller.login", {
        onInit() {
        },

        onLogin: function () {
            var sUsername = this.getView().byId("usernameInput").getValue();
            var sPassword = this.getView().byId("passwordInput").getValue();

            if (!sUsername || !sPassword) {
                MessageToast.show("Please enter both User ID and Password.");
                return;
            }

            // Using the default model defined in manifest.json (ZLOG_TATA_CDS)
            var oModel = this.getOwnerComponent().getModel();
            var sPath = "/ZLOG_TATA(bname='" + sUsername + "',password='" + sPassword + "')";

            sap.ui.core.BusyIndicator.show();

            oModel.read(sPath, {
                success: function (oData) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Login Successful!");
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Dashboard");
                }.bind(this),
                error: function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Login Failed. Please check your credentials.");
                }
            });
        }
    });
});