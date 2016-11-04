/** This is a description of the Shared Module. */

var sharedMethods = function(){
	
	
	
	this.hidef = function(){
		this.$childTemplate.css("visibility","hidden");
	};
	this.showf = function(){
		this.$childTemplate.css("visibility","visible");
	};
	this.hideDisplayf = function(){
		this.$childTemplate.css("display","none");
	};
	this.showDisplayf = function(){
		this.$childTemplate.css("display","flex");
	};
	this.disablef = function(){
		this.$innerComp.prop('readonly', true);
		this.$childTemplate.find(".formComp-field-btn button").prop("disabled",true);
	};
	this.enablef = function(){
		this.$innerComp.prop('readonly', false);	
		this.$childTemplate.find(".formComp-field-btn button").prop("disabled",false);
	};
	this.removeNode = function(){
		this.$childTemplate.remove();
	};
	this.hideBtnf = function(){
		this.$childTemplate.find('.formComp-field-btn button').css("visibility","hidden");
	};
	this.showBtnf = function(){
		this.$childTemplate.find('.formComp-field-btn button').css("visibility","visible");
	};
	this.hideDisplayBtnf = function(){
		this.$childTemplate.find('.formComp-field-btn').css("display","none");
	};
	this.showDisplayBtnf = function(){
		this.$childTemplate.find('.formComp-field-btn').css("display","flex");
	};
	this.hideLabelf = function(){
		this.$childTemplate.find('.formComp-field-label').css("visibility","hidden");
	};
	this.showLabelf = function(){
		this.$childTemplate.find('.formComp-field-label').css("visibility","visible");
	};
	this.hideLabelDisplayf = function(){
		this.$childTemplate.find('.formComp-field-label').css("display","none");	
	};
	this.showLabelDisplayf = function(){
		this.$childTemplate.find('.formComp-field-label').css("display","flex");
	};
	

	
	if(this.fieldType === "textfield" || this.fieldType === "textarea"){
		this.requiredf = function(){
			this.$childTemplate.find(".formComp-field-control").addClass("formComp-field-req formComp-field-err");
		};
		this.removeRequiredf = function(){
			this.$childTemplate.find(".formComp-field-control").removeClass("formComp-field-req formComp-field-err");
		};	
	}
	
}
			
