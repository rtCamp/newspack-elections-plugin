/**
 * Newspack Elections Block Editor Bootstrapper
 * 
 * Loads and Creates Services used by Newspack Elections Blocks. 
 * 
 * File is embedded into the the editor-blocks.js asset within webpack
 * rather than being directly referenced.
 */

import domReady from "@wordpress/dom-ready"


import { registerBlockSupports } from "./../block-supports" 
import { restoreBlocks } from "./restore-blocks";
import { initStore } from "../fields";



// Create a Redux store for fields used by Profiles
initStore()

// Add Custom Block Support
registerBlockSupports()


// Newspack disabled a few blocks we need, this is where we can re-enable them
domReady( () => {
	const requiredCoreBlocks = ["core/post-featured-image"]
	restoreBlocks(requiredCoreBlocks)
})


