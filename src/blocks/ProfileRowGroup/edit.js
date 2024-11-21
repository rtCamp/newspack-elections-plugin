/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, store as blockEditorStore} from "@wordpress/block-editor"
import {useSelect} from "@wordpress/data";

import "./edit.scss"

const Appender = (props) => {
	const blockProps = useBlockProps();
	console.log("appender", blockProps)
	return (
		<InnerBlocks.ButtonBlockAppender />
	)
}

function Edit( {attributes, setAttributes, context, clientId, ...props} ) {

	const { isBlockSelected, hasSelectedInnerBlock } = useSelect( (select) => {
		return {
			isBlockSelected : select(blockEditorStore).isBlockSelected(clientId),
			hasSelectedInnerBlock : select(blockEditorStore).hasSelectedInnerBlock(clientId),
		}
	});

	console.log("isBlockSelected", isBlockSelected)
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		renderAppender : (isBlockSelected || hasSelectedInnerBlock) ? InnerBlocks.ButtonBlockAppender : undefined
	});
	

    return (
		<div {...innerBlockProps} />
	)
}

export {Edit}
export default Edit
