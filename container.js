var fContainer = function($fieldset){
		
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
