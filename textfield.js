/** This is a description of the Textfield Module. */
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
