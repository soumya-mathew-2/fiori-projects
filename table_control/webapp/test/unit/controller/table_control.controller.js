/*global QUnit*/

sap.ui.define([
	"comapplexus/table_control/controller/table_control.controller"
], function (Controller) {
	"use strict";

	QUnit.module("table_control Controller");

	QUnit.test("I should test the table_control controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
