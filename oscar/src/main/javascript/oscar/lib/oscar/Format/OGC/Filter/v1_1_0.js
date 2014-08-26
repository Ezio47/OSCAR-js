oscar.Format.OGC.Filter.v1_1_0 = {
	readers:OpenLayers.Util.applyDefaults({
	"ogc": {
			"Filter_Capabilities":function(obj,node) {
				obj["filterCapabilities"]={};
				this.runChildNodes(obj["filterCapabilities"],node);
			},
			"Spatial_Capabilities":function(obj,node){
				obj["spatialCapabilities"]={};
				this.runChildNodes(obj["spatialCapabilities"],node);
			},
			"GeometryOperands":function(obj,node){
				obj["geometryOperands"]={};
				this.runChildNodes(obj["geometryOperands"],node);
			},
			"GeometryOperand":function(obj,node){
				if(!obj.operands) {
					obj.operands = [];
				}
				obj.operands.push(this.getChildValue(node));
				
			},
			"SpatialOperators":function(obj,node){
				obj["spatialOperators"]={};
				this.runChildNodes(obj["spatialOperators"],node);
			},
			"SpatialOperator":function(obj,node){
				if(!obj.operators) {
					obj.operators = [];
				}
				var operator = {};
				operator.name = this.getAttributeNS(node,"","name");
				obj.operators.push(operator);
			},
			"Scalar_Capabilities":function(obj,node){
				obj["scalarCapabilities"]={};
				this.runChildNodes(obj["scalarCapabilities"],node);
			},
			"LogicalOperators":function(obj,node){},
			"LocicalOperator":function(obj,node){},
			"ComparisonOperators":function(obj,node){
				obj["comparisonOperators"]={};
				this.runChildNodes(obj["comparisonOperators"],node);
			},
			"ComparisonOperator":function(obj,node){
				if(!obj.comparisonOperator) {
					obj.comparisonOperator = [];
				}
				obj.comparisonOperator.push(this.getChildValue(node));
			},
			"ArithmeticOperators":function(obj,node){},
			"SimpleArithmetic":function(obj,node){},
			"Functions":function(obj,node){},
			"FunctionNames":function(obj,node){},
			"FunctionName":function(obj,node){},
			"Id_Capabilities":function(ob,node) {},
		}
	},oscar.Format.OGC.ows.v1_0_0.readers),
		/**
	 * Constant: CLASS_NAME 
	 * - oscar.Format.OGC,Filter.v1_1_0
	 */
	CLASS_NAME : "oscar.Format.OGC.Filter.v1_1_0"
};