/*global QUnit*/

sap.ui.define([
	"comapplexus/model/controller/Model.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Model Controller");

	QUnit.test("I should test the Model controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
