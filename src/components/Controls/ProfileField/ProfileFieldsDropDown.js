import { chevronDown } from '@wordpress/icons';
import { __ } from "@wordpress/i18n"

import {
	MenuGroup,
	MenuItemsChoice,
	DropdownMenu
} from '@wordpress/components';

import { useRawField } from "./../../Profile"

export function ProfileFieldsDropDownMenu({
	onSelectField,
	fields,
	selectedValue,
	showFieldsWithEmptyValues = true,
	disableEmptyFields = true
} = props){

	console.log( fields )
	let selectedOptions = fields.map( (f) => ({
		label : f.label,
		value : f.slug,
		info: f.value,
		disabled : ( (disableEmptyFields && (!f.value || f.value === "")) ? true : false)
	}))

	if(showFieldsWithEmptyValues === false && disableEmptyFields === true){
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

	const CurrentField = useRawField(selectedValue)

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
