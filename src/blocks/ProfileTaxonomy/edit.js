/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from "@wordpress/block-editor"


function Edit( {attributes, setAttributes, context, ...props} ) {
	const blockProps = useBlockProps(  );

	console.log("context", context)
    return (
		<div {...blockProps}>
			Block!
		</div>
	)
}

export {Edit}
export default Edit
