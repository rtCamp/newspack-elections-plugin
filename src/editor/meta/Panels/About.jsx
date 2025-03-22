import { PanelRow } from "@wordpress/components";
import { useDispatch, useSelect } from '@wordpress/data';

import {GovPackSidebarPanel} from "./../../../components/sidebar-panel"
import {PanelTextControl, PanelDateControl, PanelTextareaControl} from "./../Controls"

import {MetaFieldsPanel} from './meta-fields-panel'

import { useEntityId, useEntityProp } from "@wordpress/core-data";

const changeContributesToName = (change) => {

	let keys = Object.keys(change)

	if(keys.length === 0){
		return false
	}
	let searchKeys = ["name_prefix", "name_first", "name_middle", "name_last", "name_suffix"]
	let intersection = keys.filter( i => searchKeys.includes(i) )

	if(intersection.length > 0){
		return true;
	}

	return false;
}

const getNamePieces = (meta, change) => {
	let {
		name_prefix = null, 
		name_first  = null, 
		name_middle = null, 
		name_last   = null, 
		name_suffix = null
	} = meta 

	let pieces = {
		"name_prefix" : name_prefix,
		"name_first"  : name_first,
		"name_middle" : name_middle,
		"name_last"   : name_last,
		"name_suffix" : name_suffix,
	}

	let changeKey = Object.keys(change).at(0)
	pieces[changeKey] = change[changeKey]

	return pieces

}

const assembleName = (pieces) => {
	return Object.values(pieces).join(" ").trim()
}



export const AboutPanel = (props) => {


    return (
        <MetaFieldsPanel {...props} />
    )
}