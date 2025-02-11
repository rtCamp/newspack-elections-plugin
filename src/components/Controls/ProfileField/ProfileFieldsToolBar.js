import { connection as connectionIcon, more,
    arrowLeft,
    arrowRight,
    arrowUp,
    arrowDown } from '@wordpress/icons';
import { Toolbar, ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

import {ProfileFieldsDropDownMenu} from "./ProfileFieldsDropDown"

export const ProfileFieldsToolBar = (props) => {

	const {
		setFieldKey,
		fieldKey,
		fields = [],
		showFieldsWithEmptyValues = false,
		disableEmptyFields = true
	} = props
	
	return (
		<BlockControls group="parent">
		
           		<ToolbarDropdownMenu icon = {connectionIcon}>
				   { () => (
				   <ProfileFieldsDropDownMenu 
				   		className={ 'govpack-profile-field-select' }
						onSelectField={ setFieldKey }
						selectedValue={ fieldKey }
						fields={ fields }
						showFieldsWithEmptyValues = {showFieldsWithEmptyValues}
						disableEmptyFields = {disableEmptyFields}
				   />
				   )}
		  		</ToolbarDropdownMenu>
			
		</BlockControls>
    );
}