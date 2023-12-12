/*global QUnit*/

sap.ui.define([
	"comapplexus/practice1/controller/Practice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Practice Controller");

	QUnit.test("I should test the Practice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
