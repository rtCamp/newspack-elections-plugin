import { chevronDown } from '@wordpress/icons';
import { __ } from "@wordpress/i18n"

import {
	MenuGroup,
	MenuItemsChoice,
	DropdownMenu
} from '@wordpress/components';

import { useProfileField } from "./../../Profile"

export default function ProfileFieldsDropDown( {
	className,
	onSelectField,
	selectedValue,
	fields
} ) {

	const CurrentField = useProfileField(selectedValue)

	const selectedOptions = fields.map( (f) => ({
		label : f.label,
		value : f.slug,
		info: f.value,
		disabled : (!f.value ? true : false)
	}))

	console.log("selectedValue", selectedValue, CurrentField)

	return (
		<DropdownMenu
			className={ className }
			label={ __( 'Profile Field Selector' ) }
			text={ CurrentField.label }
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
					<MenuGroup>
						<MenuItemsChoice
							choices={ selectedOptions }
							value={ selectedValue }
							onSelect={ (v) => {
								console.log(v)
								onSelectField(v) 
							}}
						/>
					</MenuGroup>
				</div>
			) }
		</DropdownMenu>
	);
}
