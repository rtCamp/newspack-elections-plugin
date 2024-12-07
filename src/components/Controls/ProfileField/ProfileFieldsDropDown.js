import { chevronDown } from '@wordpress/icons';
import { __ } from "@wordpress/i18n"

import {
	MenuGroup,
	MenuItemsChoice,
	DropdownMenu
} from '@wordpress/components';

export default function ProfileFieldsDropDown( {
	className,
	onSelectField,
	selectedValue,
	fields
} ) {

	const selectedOptions = fields.map( (f) => ({
		label : f.label,
		value : f.slug,
		info: f.value,
		disabled : (!f.value ? true : false)
	}))

	return (
		<DropdownMenu
			className={ className }
			label={ __( 'Profile Field' ) }
			text={ __( 'Profile Field' ) }
			popoverProps={ {
				position: 'bottom center',
				className: `${ className }__popover`,
			} }
			icon={ chevronDown }
			toggleProps={ { iconPosition: 'right' } }
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
