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
		fields = []
	} = props
	
	return (
		<BlockControls >
			<ToolbarGroup>
           		<ToolbarDropdownMenu icon = {connectionIcon}>
				   { () => (
				   <ProfileFieldsDropDownMenu 
				   		className={ 'govpack-profile-field-select' }
						onSelectField={ setFieldKey }
						selectedValue={ fieldKey }
						fields={ fields }
						showFieldsWithEmptyValues = {false}
				   />
				   )}
		  		</ToolbarDropdownMenu>
			</ToolbarGroup>
		</BlockControls>
    );
}