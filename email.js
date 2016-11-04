var fRadio = function($fieldset){
		
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
