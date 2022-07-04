sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
	"use strict";

	return {
		init: function () {
			// create
			var oMockServer = new MockServer({
				rootUri: "https://port8080-workspaces-ws-sqrxc.us10.trial.applicationstudio.cloud.sap/Northwind/V2/Northwind/Northwind.svc/"
			});

			var oUriParameters = new UriParameters(window.location.href);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			// simulate
			var sPath = sap.ui.require.toUrl("sap/ui/demo/walkthrough/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start
			oMockServer.start();
		}
	};

});
