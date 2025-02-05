

/**
 * Internal dependencies
 */

import {createGPBlockListBlockFilter, createGPBlockRegisterFilter} from "./utils"

import fieldType from "./field-type"
import fieldKey from "./field-key"



const features = [
	fieldType,
	fieldKey
]

export const registerBlockSupports = () => {
	//createGPBlockListBlockFilter(features)
	createGPBlockRegisterFilter(features)
}

