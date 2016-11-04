/** This is a description of the Textarea Module. */
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
