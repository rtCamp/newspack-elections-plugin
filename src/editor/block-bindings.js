import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { store as coreEditorStore } from '@wordpress/editor';

import { store as coreStore } from '@wordpress/core-data';

import { useProfileFields} from "./../profile"

function getProfileFields(select, context){
	const {getEntityRecord} = select(coreStore)
	const { 
		postId
	} = context

	const record = getEntityRecord("postType", "govpack_profiles", postId )

	return record?.profile || {}
}

function registerProfileBindingSource(){

	
	registerBlockBindingsSource( {
		name: 'govpack/profile',
		getValues( {bindings, context, select, ...args} ) {

			const profileFields = getProfileFields(select, context)
			
			console.log(profileFields)

			const newValues = {};
			for ( const [ attributeName, source ] of Object.entries( bindings ) ) {

				// Use the value, the field label, or the field key.
				const fieldKey = source.args.key;
				const fieldSubKey = source.args?.subkey ?? null;

				console.log("Source", source)
				let fieldValue = profileFields?.[ fieldKey ] ?? "" ;
				if((typeof fieldValue === "object") && fieldSubKey ){
					fieldValue = fieldValue[fieldSubKey] ?? "";
				}
				

				//newValues[ attributeName ] = fieldValue ?? fieldLabel ?? fieldKey;
				newValues[ attributeName ] = fieldValue
			}
			console.log(newValues)
			return newValues
		},
		setValues( { dispatch, bindings } ) {
		
		},
		canUserEditValue( { context, args } ) {
			return false;
		},
	} );
}

export default registerProfileBindingSource
export { registerProfileBindingSource  }