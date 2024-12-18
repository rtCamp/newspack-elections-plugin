

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


/**
 * Internal dependencies
 */
import { FieldBlockEdit } from '../../components/field-block-edit';
import { useProfileFieldAttributes } from './../../components/Profile';



function Edit( props ) {

	const { fieldKey, value, field } =  useProfileFieldAttributes(props) 

	const profileValue = () => {

		if(field.type === "link"){
			let url = value?.url;
			return (<a href={ url }>{ url }</a>)
		}

		if(typeof value === "object"){
			return ""
		}

		return value.trim()
	}

	const FieldValue = profileValue(fieldKey)

    return (
		<>
			<FieldBlockEdit {...props} >
				{FieldValue}
			</FieldBlockEdit>
		</>
	)
}



export {Edit}
export default Edit
