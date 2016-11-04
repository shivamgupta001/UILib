
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
