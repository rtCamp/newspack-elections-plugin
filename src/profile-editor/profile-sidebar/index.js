
import { more } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';

import {ProfileMetaSidebar} from "./profile-meta-sidebar"

import "./view.scss"

const initSidebar = () => {

	registerPlugin( 'profile-meta', {
		icon: more,
		render: ProfileMetaSidebar,
	} );

}

export default initSidebar
export  { initSidebar }