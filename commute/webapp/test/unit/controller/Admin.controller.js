/*global QUnit*/

sap.ui.define([
	"comapplexus/commute/controller/Admin.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Admin Controller");

	QUnit.test("I should test the Admin controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
