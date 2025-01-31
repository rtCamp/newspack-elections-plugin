

import { dispatch } from "@wordpress/data"
import {  getBlockType} from '@wordpress/blocks';
import { __experimentalGetCoreBlocks as getCoreBlocks } from '@wordpress/block-library'
import  domReady  from "@wordpress/dom-ready"

import { registerProfileBindingSource } from "./block-bindings"
dispatch( 'core' ).addEntities( [ {
	baseURL: '/govpack/v1/profile',
	// The 'post' is not a post type - it's the "post" as in /post above. Also, "kind"
	// and "name" are not documented, so let's assume they form the above baseURL..
	kind: 'govpack',
	name: 'fields',
	label: 'Govpack Profile Fields',
} ] );

registerProfileBindingSource()

const restoreDeregisteredBlocks = () => {
	console.log("reRegister", getCoreBlock("b"))
	const blocks = ["core/post-featured-image"]
	
	blocks.forEach( (block) => {
		restoreDeregisteredBlock(block)
	})
}

/**
 * Check if a block is registered.
 *
 * @param {string} name The block's name.
 *
 * @return {boolean} Whether the block is registered.
 */
export function isBlockRegistered( name ) {
	return getBlockType( name ) !== undefined;
}

const restoreDeregisteredBlock = (blockName) => {

	if(isBlockRegistered(blockName)){
		return;
	}

	const block = getCoreBlock(blockName)
	block.init()
}

const getCoreBlock = (block) => {
	return  getCoreBlocks().find( ({name}) => {
		return name === block
	})
}

domReady( () => {
	restoreDeregisteredBlocks()
})