/*global QUnit*/

sap.ui.define([
	"comapplexus/calculator/controller/calculator.controller"
], function (Controller) {
	"use strict";

	QUnit.module("calculator Controller");

	QUnit.test("I should test the calculator controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
