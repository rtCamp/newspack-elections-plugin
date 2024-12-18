

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from "./../../components/Profile"


function Edit( props ) {

	
	const {fieldKey, value } =  useProfileFieldAttributes(props) 
	

	const href =  value?.url ?? false
	const label =  value?.linkText ?? false
	const showValue = value !== null

    return (
		<FieldBlockEdit {...props} >
			{ (showValue) && (
				<a href={href}>{label}</a>
			) }
			{ (!fieldKey) && (
				<span>Please Select a Field </span> 
			) }
		</FieldBlockEdit>
	)
}

export {Edit}
export default Edit
