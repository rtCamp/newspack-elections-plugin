import {isObject} from "lodash"
import FieldType from "./field"

export default class PostProperty extends FieldType {

	static slug = "post_property"

	constructor(...args) {
		super(...args);
	}

	valueToText(value){

		if(isObject(value) && Object.hasOwn(value, "rendered")){
			return this.stripHTML(value.rendered)
		}

		return "val?"
	}

	stripHTML(value){

		const document = new window.DOMParser().parseFromString(
			value,
			'text/html'
		);

		return document.body.textContent || document.body.innerText || '';
	}
}

