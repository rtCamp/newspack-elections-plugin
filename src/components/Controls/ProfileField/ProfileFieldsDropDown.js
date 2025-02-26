import styled from '@emotion/styled';

import { chevronDown } from '@wordpress/icons';
import { __ } from "@wordpress/i18n"


import { DropdownMenu } from '@wordpress/components';

import { useField } from "./../../../profile-fields"
import { ProfileFieldsMenu } from './ProfileFieldsMenu';

const StyledDropdownMenu = styled( DropdownMenu )`
	width: 100%;
`;

export default function ProfileFieldsDropDown( props ) {

	const {
		className,
		selectedValue
	} = props

	const CurrentField = useField(selectedValue)


	return (
		<StyledDropdownMenu
			className={ className }
			label={ __( 'Profile Field Selector' ) }
			text={ CurrentField?.label ?? "Select a Profile Field" }
			popoverProps={ {
				position: 'bottom center',
				className: `${ className }__popover`,
			} }
			icon={ chevronDown }
			toggleProps={ { 
				iconPosition: 'right',
				variant: "secondary"
			} }
		>
			{ () => (
				<div className={ `${ className }__container` }>
					<ProfileFieldsMenu {...props} />
				</div>
			) }
		</StyledDropdownMenu>
	);
}
