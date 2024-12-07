import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
 import {ProfileEdit as Edit} from './edit/index';
 import Save from './save';
 import metadata from './block.json';

 /**
 * Style dependencies - will load in editor
 */
import './view.scss';



const { attributes, category } = metadata;

registerBlockType( 'govpack/profile-v2', {
	apiVersion: 3,
	title: 'GovPack Profile v2',
    category,
    attributes,
	icon: 'groups',
	keywords: [ 'govpack' ],
    styles: [
	],
	edit : Edit,
	save: Save,
} );
