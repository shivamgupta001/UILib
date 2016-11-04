
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
}