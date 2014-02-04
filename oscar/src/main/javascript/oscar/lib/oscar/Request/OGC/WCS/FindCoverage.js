/*
* CARIS oscar - Open Spatial Component ARchitecture
*
* Copyright 2012 CARIS <http://www.caris.com>
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* 	http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
* Class: FindCoverage
* 
* This class handles FindCoverage requests.
*/
oscar.Request.OGC.WCS.FindCoverage=new oscar.BaseClass(oscar.Request.OGC.WCS,{
	version:"1.1.0",
	xsltLocation:oscar._getScriptLocation() + "resources/GetAttributes.xsl",
	initialize:function(url,bounds,crs,title,maxresults,options){
		var parameters = this.getParameters();
		if(bounds) {
			OpenLayers.Util.extend(parameters,{
				minx:bounds.left,
				miny:bounds.bottom,
				maxx:bounds.right,
				maxy:bounds.top
			});
		}
		if(crs) {
			OpenLayers.Util.extend(parameters,{
				crs:crs
			});
		}
		
		if(title) {
			OpenLayers.Util.extend(parameters, {
				title:title
			});
		}		
		
		if(maxresults) {
			OpenLayers.Util.extend(parameters, {
				maxresults:parseInt(maxresults)
			});
		}
		
		oscar.Request.OGC.WCS.prototype.initialize.apply(this,[
			url,
			parameters,
			options
		]);
	},
	success:function(resp) {
		var parser = new oscar.Format.WCSFindCoverage();
		results = parser.read(resp.responseText);
		if(!results.coverages) {
			var result = (resp.responseXML)?resp.responseXML:resp.responseText;
			var $html = this._transformResults(result);
			this.events.triggerEvent("failure",$html);
		} else if (results.coverages.length == 0) {
			var error = $$("<div></div>").html(oscar.i18n("nocoverages"));
			this.events.triggerEvent("failure",error);
		} else {
			this.events.triggerEvent("success",results);
		}
	},
	
		/**
	* Method: _transformResults
	* 
	* This method makes a request to the GetAttributes xsl transformation stylesheet
	* and transforms the response xml into html which will then be passed on with the 
	* success event.
	* 
	* Parameters: 
	* 
	* xml - The response xml from the GetAttributes operation.
	*/
	_transformResults:function(xml) {
		var xslt=null;
		OpenLayers.Request.GET({
			url:this.xsltLocation,
			async:false,
			success:function(resp) {
				xslt = resp.responseXML;
			},
			failure:function(resp) {
				oscar.debug("Unable to obtain xslt at " + this.xsltLocation);
			},
			scope:this
		});

		if(!xslt) {
			return $$("<div></div>");
		} 
		var html = oscar.Util.Transform.transform(xml,xslt);
		return $$(html);
	},
	getRequest:function() {
		return "FindCoverage"
	},
	getParameters:function() {
		return {
			"minx":-180,
			"miny":-90,
			"maxx":180,
			"maxy":90,
			"crs":"EPSG:4326",
			"maxresults":20,
			"request":this.getRequest(),
			"version":"1.1.0"
		};
	},
	CLASS_NAME:"oscar.Request.OGC.WCS.FindCoverage"
});