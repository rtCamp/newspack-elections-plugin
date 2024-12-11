import { chevronDown } from '@wordpress/icons';
import { __ } from "@wordpress/i18n"

import {
	MenuGroup,
	MenuItemsChoice,
	DropdownMenu
} from '@wordpress/components';

import { useProfileField } from "./../../Profile"

export function ProfileFieldsDropDownMenu({
	onSelectField,
	fields,
	selectedValue,
	showFieldsWithEmptyValues = true
} = props){

	let selectedOptions = fields.map( (f) => ({
		label : f.label,
		value : f.slug,
		info: f.value,
		disabled : ((!f.value || f.value === "") ? true : false)
	}))

	if(!showFieldsWithEmptyValues){
		selectedOptions = selectedOptions.filter( (f) => !f.disabled)
	}

	return (
		<MenuGroup>
			<MenuItemsChoice
				choices={ selectedOptions }
				value={ selectedValue }
				onSelect={ (v) => {
					onSelectField(v) 
				}}
			/>
		</MenuGroup>
	)
}

export default function ProfileFieldsDropDown( props ) {

	const {
		className,
		onSelectField,
		selectedValue,
		fields
	} = props

	const CurrentField = useProfileField(selectedValue)

	return (
		<DropdownMenu
			className={ className }
			label={ __( 'Profile Field Selector' ) }
			text={ CurrentField?.label ?? "Select a Profile Field" }
			popoverProps={ {
				position: 'bottom center',
				className: `${ className }__popover`,
			} }
			icon={ chevronDown }
			toggleProps={ { 
				iconPosition: 'right'
			} }
		>
			{ () => (
				<div className={ `${ className }__container` }>
					<ProfileFieldsDropDownMenu 	{...props} />
				</div>
			) }
		</DropdownMenu>
	);
}
