

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library"
],
function (Controller,Device,JSONModel,Popover,Button,library) {
    "use strict";

    return Controller.extend("com.app.rfscreens.controller.AdminView", {
        onInit: function () {
            
			var oModel = new JSONModel(sap.ui.require.toUrl("com/app/rfscreens/model/data1.json"));
            this.getView().setModel(oModel);
            this._setToggleButtonTooltip(!Device.system.desktop);
        },
 
        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },
 
        handleUserNamePress: function (event) {
            var oPopover = new Popover({
                showHeader: false,
                placement: PlacementType.Bottom,
                content: [
                    new Button({
                        text: 'Feedback',
                        type: ButtonType.Transparent
                    }),
                    new Button({
                        text: 'Help',
                        type: ButtonType.Transparent
                    }),
                    new Button({
                        text: 'Logout',
                        type: ButtonType.Transparent
                    })
                ]
            }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
 
            oPopover.openBy(event.getSource());
        },
 
        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();
 
            this._setToggleButtonTooltip(bSideExpanded);
 
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },
 
        _setToggleButtonTooltip: function (bLarge) {
            var oToggleButton = this.byId('sideNavigationToggleButton');
            if (bLarge) {
                oToggleButton.setTooltip('Large Size Navigation');
            } else {
                oToggleButton.setTooltip('Small Size Navigation');
            }
        },
        
         /** Notification text */
         onNotificationAdminPress: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();
                debugger

            // create popover
            if (!this._pPopover) {
                this._pPopover = this.loadFragment({
                    name: "com.app.outbound.fragments.notificationAdmin"
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },

		
    });
});
