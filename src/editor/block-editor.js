

import { dispatch, select } from "@wordpress/data"
import domReady from "@wordpress/dom-ready"
import {registerBlockSupports} from "./../block-supports" 

import { registerProfileBindingSource } from "./block-bindings"
import { restoreBlocks } from "./restore-blocks";
import { store } from "./../profile-fields";

dispatch( 'core' ).addEntities( [ {
	baseURL: '/govpack/v1/profile',
	// The 'post' is not a post type - it's the "post" as in /post above. Also, "kind"
	// and "name" are not documented, so let's assume they form the above baseURL..
	kind: 'govpack',
	name: 'fields',
	label: 'Govpack Profile Fields',
} ] );

console.log("getFields", select(store).getFields())

registerProfileBindingSource()
registerBlockSupports()

const requiredCoreBlocks = ["core/post-featured-image"]
domReady( () => {
	restoreBlocks(requiredCoreBlocks)
})