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
	isEligible: (attributes, innerBlocks, data) => {
		return innerBlocks.some( (block) => targetBlocks.includes(block.name) )
	},
	save: () => {
	},
	migrate: (attributes, innerBlocks) => {
		
		// We want to look through each innerblock and transform _some_ of them to a different block type.
		// the number of blocks returned may not match the innerBlocks being transformed so use reduce instead of map. 
		// Prefer reduce over foreach to avoid state outside of the loop
		const newInnerBlocks = innerBlocks?.reduce( (migratedBlocks, block) => {

			// Check the block passed to process is in the block targets list, if not return early
			if(!targetBlocks.includes(block.name)){
				migratedBlocks.push(block)
				return migratedBlocks
			}

			// use block transforms to change the block type.
			// This returns an array for loop that later on
			const newBlocks = switchToBlockType(block, targetBlockSwaps[block.name])
			
			// if the type switch failed, (e.g) no registered transforms, it will return null
			// add the original block to accumulator and return from the function to avoid looping null
			if(newBlocks === null){
				console.warn("No Available Transfrom")
				migratedBlocks.push(block)
				return migratedBlocks
			}

			// the switchToBlockType returns an array so loop it and add to the accumulator
			// then exit the migration
			newBlocks.forEach((block) => {
				migratedBlocks.push(block)
			})

			return migratedBlocks

		}, []) ?? [] // if innerBlocks isn't set then return an empty array

		
		return [
			attributes,
			newInnerBlocks
		]
	}
}

export default dep0_1