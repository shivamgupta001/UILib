
/** This is a description of the Form Module. */
var Form = function(config){
	
	var formName = config.formName,
		formItems = config.formItems,
		width  = config.width,
		margin = config.margin,
		formLayout = config.formLayout,
		flex = config.flex,
		$formTemplate;

	$formTemplate = $('<form id="'+formName+'" class="formComp"></form>');
	$formTemplate.css("width" , width);
	$formTemplate.css("margin" , margin);


	

	iterateStructure(formItems ,flex ,  formLayout ,  $formTemplate);
	/*formItems.forEach(function(value , index){
		iterateItems(value , $fieldset);
	});*/
		
	
	function iterateItems(item , $template){
		 
		switch(item.fieldType){
			
			case 'textfield' 	: fTextfield.call(item ,$template);
								break;
			case 'textarea' 	: fTextarea.call(item , $template);
								break;
			case 'checkbox'		: fCheckbox.call(item , $template);
								break;
			case 'radio'		: fRadio.call(item , $template);
								break;
			case 'container'	: fContainer.call(item , $template);
								break;
			case 'combobox'		: fCombobox(item , formName);
								break;
			case 'mCombobox'	: fMCombobox(item , formName);
								break;
			case 'number'		: fNumber(item , formName);
								break;
		}	
	}
	function iterateStructure(fStructure,flex , formLayout, $template){
		
		var $fieldset;
		if(fStructure.length > 0){

			if(formLayout === 'row') $fieldset = $('<div class="formComp-fieldset-row">');
			else $fieldset = $('<div class="formComp-fieldset-col">');
						
			fStructure.forEach(function(item , index){
				
				if(item.formItems && item.formItems.length > 0) iterateStructure(item.formItems,item.flex, item.formLayout, $fieldset);
				else iterateItems(item , $fieldset);
			});
			if(flex) $fieldset.attr("style","flex:"+flex);	
			$template.append($fieldset);
		}
	}
	
	
//	$formTemplate.append($fieldset);
//	$formTemplate.append("<input type='submit' value='submit'>");
	$('body').append($formTemplate);
};/** This is a description of the Shared Module. */

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
			
;/** This is a description of the Checkbox Module. */
var fCheckbox = function($fieldset){
		
		var checkbox = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = "checkbox-"+getRandomInt(1, 10000);
				this.fieldLabel = me.fieldLabel || '';
				this.value = me.value || '';
				this.fieldGroup = me.fieldGroup || [];
				this.groupLayout = me.groupLayout || 'column';
				this.btn = (me.btn === false) ? false : true;
				this.label = (me.label === false) ? false : true;
				this.labelAreaDisplay = (me.labelDisplayArea === false)  ? false : true;
				this.btnAreaDisplay = (me.btnAreaDisplay === false) ? false : true;
				this.labelClass = me.labelClass || false;
				this.compClass = me.compClass || false;
				this.btnClass = me.btnClass||false;
				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				this.$childTemplate = $(`<div class="formComp-field" `+ (this.flex? 'style="flex:'+this.flex+'"' : '')+`> 
											`+(this.labelAreaDisplay ? "<span class='formComp-field-label "+(this.labelClass ? this.labelClass:'' )+" '>"+(this.label ? '<label for="'+this.dynamicId+'">'+this.fieldLabel+'</label>' : '')+"</span>" : '')+`
											<span id="`+this.dynamicId+`"
												class="formComp-field-control `+ (this.required === 'required' ? ' formComp-field-req formComp-field-err':' formComp-field-blank')+``+(this.compClass ? this.compClass : '' )+`">
													
											</span>
											`+(this.btnAreaDisplay ? "<span class='formComp-field-btn "+(this.btnClass ? this.btnClass:'' )+" '>"+(this.btn ? '<button>Click</button>' : '')+"</span>" : '')+`
										</div>`);
				
				
				this.$innerComp = this.$childTemplate.find("#"+this.dynamicId)[0];
				
				this.fieldGroup.forEach(function(val , index){
					
					var dynamicId = 'checkbox'+getRandomInt(1,10000);
					$('<input />', { type: 'checkbox', id:dynamicId , value: val.value, name : val.name}).appendTo(this.$innerComp);
   					$('<label />', { for: dynamicId, text: val.display}).appendTo(this.$innerComp);
   					if(this.groupLayout === 'column') $('<br>').appendTo(this.$innerComp);
   					
				},this);
				
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
			
						var eventNamespace = 'fComp.'+getRandomInt(1, 10000);
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
					}
				}
			},
			_render : function(){
				$fieldset.append(this.$childTemplate);	
				if(this.render != ''){
					this.render();
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				sharedMethods.call(me);
			},
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
		checkbox._init();
	
};
;var fContainer = function($fieldset){
		
		var container = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
			//	this._bindEvents();
				this._attachProperties();
				this._render();	
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = "textField-"+getRandomInt(1, 10000);
				this.fieldLabel = me.fieldLabel || '';
				this.flex = me.flex || false;
				this.containerClass = me.containerClass || false;
				this.html = me.html || '';
				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				this.$childTemplate = $(`<div class="formComp-field  `+(this.containerClass ? this.containerClass : '')+` " `+ (this.flex? 'style="flex:'+this.flex+'"' : '')+`> 
											
										</div>`);
				
				this.$childTemplate.append(this.html);
			},
			_render : function(){
				var me = this.scope;
				$fieldset.append(this.$childTemplate);	
				if(this.render != ''){
					me.render( 5 , 6);
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
							
				//methods
				sharedMethods.call(me);
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
		container._init();
	
};
;var fRadio = function($fieldset){
		
		var textfield = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = "textField-"+getRandomInt(1, 10000);
				this.fieldLabel = me.fieldLabel || '';
				this.placeHolder = me.placeHolder || '';
				this.pattern = me.pattern || '';
				this.required = (me.required === true) ? 'required' : '';
				this.value = me.value || '';
				this.readOnly = (me.readOnly === true) ? 'readonly' : '';
				this.maxlength = me.maxlength || ''; 

				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				this.$childTemplate = $(`<div class="formComp-field"> 
											<span class="formComp-field-label">
												<label for="`+this.dynamicId+`">`+this.fieldLabel+`</label> 
											</span>
											<span class="formComp-field-control">
												<span class="formComp-field-required">`+ (this.required === 'required' ? '*' : '') +`</span>
												<span class="formComp-field-input">
													<input 
														type="text" 
														id="`+this.dynamicId+`" 
														value="`+this.value+`"
														placeholder="`+this.placeHolder+`" 
														pattern = "`+this.pattern+`"
														maxlength = "`+this.maxlength+`" 
														`+this.required+` 
														`+this.readOnly+`> 
												</span>
												<span class="formComp-field-error">x</span>
											</span>
											<span class="formComp-field-btn">
												<button>Click</button>
											</span>
										</div>`);
				this.$innerComp = this.$childTemplate.find("input")[0];
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.$innerComp[listener] = this.listeners[listener].bind(me , 1 , 2);
					}
				}
			},
			_render : function(){
				$fieldset.append(this.$childTemplate);	
				if(this.render != ''){
					this.render( 5 , 6);
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				me.hidef = this.hidef;
				me.showf = this.showf;
				me.disablef = this.disablef;
				me.enablef = this.enablef;
				me.requiredf = this.requiredf;
				me.removeRequiredf = this.removeRequiredf;
				me.removeNode = this.removeNode;
			
			},
			hidef : function(){
				this.$childTemplate.css("visibility","hidden");
			},
			showf : function(){
				this.$childTemplate.css("visibility","visible");
			},
			disablef : function(){
				this.$innerComp.prop('readonly', true);
			},
			enablef : function(){
				this.$innerComp.prop('readonly', false);	
			},
			requiredf : function(){
				this.$innerComp.prop('required', true);
			},
			removeRequiredf : function(){
				this.$innerComp.prop('required', false);
			},
			removeNode : function(){
				this.$childTemplate.remove();
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
		textfield._init();
	
};
;
/** This is a description of the Radio Module. */
var fRadio = function($fieldset){
		
		var radio = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = "radio-"+getRandomInt(1, 10000);
				this.fieldLabel = me.fieldLabel || '';
				this.value = me.value || '';
				this.fieldGroup = me.fieldGroup || [];
				this.groupLayout = me.groupLayout || 'column';
				this.btn = (me.btn === false) ? false : true;
				this.label = (me.label === false) ? false : true;
				this.labelAreaDisplay = (me.labelDisplayArea === false)  ? false : true;
				this.btnAreaDisplay = (me.btnAreaDisplay === false) ? false : true;
				this.labelClass = me.labelClass || false;
				this.compClass = me.compClass || false;
				this.btnClass = me.btnClass||false;
				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				this.$childTemplate = $(`<div class="formComp-field" `+ (this.flex? 'style="flex:'+this.flex+'"' : '')+`> 
											`+(this.labelAreaDisplay ? "<span class='formComp-field-label "+(this.labelClass ? this.labelClass:'' )+" '>"+(this.label ? '<label for="'+this.dynamicId+'">'+this.fieldLabel+'</label>' : '')+"</span>" : '')+`
											<span id="`+this.dynamicId+`"
												class="formComp-field-control `+ (this.required === 'required' ? ' formComp-field-req formComp-field-err':' formComp-field-blank')+``+(this.compClass ? this.compClass : '' )+`">
													
											</span>
											`+(this.btnAreaDisplay ? "<span class='formComp-field-btn "+(this.btnClass ? this.btnClass:'' )+" '>"+(this.btn ? '<button>Click</button>' : '')+"</span>" : '')+`
										</div>`);
				
				this.$innerComp = this.$childTemplate.find("#"+this.dynamicId)[0];
				
				this.fieldGroup.forEach(function(val , index){
					
					var dynamicId = 'radio'+getRandomInt(1,10000);
					$('<input />', { type: 'radio', id:dynamicId , value: val.value, name : val.name}).appendTo(this.$innerComp);
   					$('<label />', { for: dynamicId, text: val.display}).appendTo(this.$innerComp);
   					if(this.groupLayout === 'column') $('<br />').appendTo(this.$innerComp);
   					
				},this);
				
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
			
						var eventNamespace = 'fComp.'+getRandomInt(1, 10000);
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
					}
				}
			},
			_render : function(){
				$fieldset.append(this.$childTemplate);	
				if(this.render != ''){
					this.render();
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				sharedMethods.call(me);
			},
			_handleEventsBefore : function(a,b){
				$(this.$innerComp).trigger(a , b.target.value);
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
		radio._init();
	
};
;/** This is a description of the Textarea Module. */
var fTextArea = function($fieldset){
		
		var textarea = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = "textArea-"+getRandomInt(1, 10000);
				this.fieldLabel = me.fieldLabel || '';
				this.placeHolder = me.placeHolder || '';
				this.pattern = me.pattern || '';
				this.required = (me.required === true) ? 'required' : '';
				this.value = me.value || '';
				this.readOnly = (me.readOnly === true) ? 'readonly' : '';
				this.maxlength = me.maxlength || ''; 
				this.cols = me.cols || 40;
				this.rows = me.rows || 4;
				this.btn = (me.btn === false) ? false : true;
				this.label = (me.label === false) ? false : true;
				this.labelAreaDisplay = (me.labelDisplayArea === false)  ? false : true;
				this.btnAreaDisplay = (me.btnAreaDisplay === false) ? false : true;
				this.labelClass = me.labelClass || false;
				this.compClass = me.compClass || false;
				this.btnClass = me.btnClass||false;
				this.flex = me.flex || false;

				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				this.$childTemplate = $(`<div class="formComp-field" `+ (this.flex? 'style="flex:'+this.flex+'"' : '')+`> 
											`+(this.labelAreaDisplay ? "<span class='formComp-field-label "+(this.labelClass ? this.labelClass:'' )+" '>"+(this.label ? '<label for="'+this.dynamicId+'">'+this.fieldLabel+'</label>' : '')+"</span>" : '')+`
											<span 
												class="formComp-field-control `+ (this.required === 'required' ? ' formComp-field-req formComp-field-err':' formComp-field-blank')+``+(this.compClass ? this.compClass : '' )+`">
													<textarea 
														id="`+this.dynamicId+`"
														cols="`+this.cols+`"
														rows="`+this.rows+`" 
														value="`+this.value+`"
														placeholder="`+this.placeHolder+`" 
														maxlength = "`+this.maxlength+`" 
														`+this.required+` 
														`+this.readOnly+`>
													</textarea>
											</span>
											`+(this.btnAreaDisplay ? "<span class='formComp-field-btn "+(this.btnClass ? this.btnClass:'' )+" '>"+(this.btn ? '<button>Click</button>' : '')+"</span>" : '')+`
										</div>`);
				
				this.$innerComp = this.$childTemplate.find("textarea")[0];
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
			
						var eventNamespace = 'fComp.'+getRandomInt(1, 10000);
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
					}
				}
			},
			_render : function(){
				$fieldset.append(this.$childTemplate);	
				if(this.render != ''){
					this.render();
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				sharedMethods.call(me);
			},
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
		textarea._init();
	
};
;/** This is a description of the Textfield Module. */
var fTextfield = function($fieldset){
		
		var textfield = {
			scope : this,
			 /** @access private */
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;

				 /** @access private */
				this.dynamicId = "textField-"+getRandomInt(1, 10000);
				this.fieldLabel = me.fieldLabel || '';
				this.flex = me.flex || false;
				this.labelClass = me.labelClass || false;
				this.compClass = me.compClass || false;
				this.btnClass = me.btnClass||false;
				this.placeHolder = me.placeHolder || '';
				this.pattern = me.pattern || '';
				this.required = (me.required === true) ? 'required' : '';
				this.value = me.value || '';
				this.readOnly = (me.readOnly === true) ? 'readonly' : '';
				this.maxlength = me.maxlength || '';
				this.btn = (me.btn === false) ? false : true;
				this.label = (me.label === false) ? false : true;
				this.labelAreaDisplay = (me.labelDisplayArea === false)  ? false : true;
				this.btnAreaDisplay = (me.btnAreaDisplay === false) ? false : true;

				 /** @access private */
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			 /** @access private */
			_generateTemplate : function(){
				
				this.$childTemplate = $(`<div class="formComp-field" `+ (this.flex? 'style="flex:'+this.flex+'"' : '')+`> 
											`+(this.labelAreaDisplay ? "<span class='formComp-field-label "+(this.labelClass ? this.labelClass:'' )+" '>"+(this.label ? '<label for="'+this.dynamicId+'">'+this.fieldLabel+'</label>' : '')+"</span>" : '')+`
											<span 
												class="formComp-field-control `+ (this.required === 'required' ? ' formComp-field-req formComp-field-err':' formComp-field-blank')+``+(this.compClass ? this.compClass : '' )+`">
													<input 
														type="text" 
														id="`+this.dynamicId+`" 
														value="`+this.value+`"
														placeholder="`+this.placeHolder+`" 
														pattern = "`+this.pattern+`"
														maxlength = "`+this.maxlength+`" 
														`+this.required+` 
														`+this.readOnly+`> 
											</span>
											`+(this.btnAreaDisplay ? "<span class='formComp-field-btn "+(this.btnClass ? this.btnClass:'' )+" '>"+(this.btn ? '<button>Click</button>' : '')+"</span>" : '')+`
											</div>`);
				this.$innerComp = this.$childTemplate.find("input")[0];
			},
			 /** @access private */
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
			
						var eventNamespace = 'fComp.'+getRandomInt(1, 10000);
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
					}
				}
			},
			 /** @access private */
			_render : function(){
				$fieldset.append(this.$childTemplate);	
				if(this.render != ''){
					this.render();
				}
			},
			 /** @access private */
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				sharedMethods.call(me);
			},
			 /** @access private */
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
		textfield._init();
	
};
