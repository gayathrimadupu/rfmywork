/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comapp/admin-screen/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
