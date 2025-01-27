import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import {switchToBlockType}  from '@wordpress/blocks'; 
const targetBlockSwaps = {
	"core/post-title" : "govpack/profile-name",
	"core/post-excerpt": "govpack/profile-bio",
}

const targetBlocks = Object.keys(targetBlockSwaps)

const dep0_1 = {
	"attributes": {
		"preview" : {
			"type": "boolean",
			"default": false
		},
		"queryId": {
			"type": "number"
		},
		"profileId": {
			"type": "number"
		},
		"postId": {
			"type": "number"
		},
		"postType": {
			"type": "string",
			"default": "govpack_profiles"
		},
		"width": {
			"type": "string"
		},
		"customWidth": {
			"type": "string",
			"default": "250px"
		},
		"style": {
			"type": "object"
		},
		"tagName": {
			"type": "string",
			"default" : "div"
		}
	},
	supports : {},
	isEligible: (attributes, innerBlocks, data) => innerBlocks.some( (block) => targetBlocks.includes(block.name) ),
	save: () => {
	},
	migrate: (attributes, innerBlocks) => {
		console.log("in Migrate", attributes, innerBlocks)
		return [
			attributes,
			innerBlocks.map( (block) => {
				// Check the block passed to process is in the block targets list, if not return early
				if(!targetBlocks.includes(block.name)){
					return block
				}

				// use block transforms to chnage the block type
				const newBlock = switchToBlockType(block, targetBlockSwaps[block.name])

				// if the type switch failed, (e.g) no registered transforms, it will return null
				// return the original block
				if(newBlock === null){
					console.warn("No Available Transfrom")
					return block
				}
				
				// all went well so return the new block
				return newBlock
			})
		]
	}
}

export default dep0_1