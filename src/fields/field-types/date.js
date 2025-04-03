import FieldType from "./field"

import {isMatch, parse} from "date-fns"

const MYSQL_DATE_FORMAT = "yyyy-MM-dd"

export default class DateField extends FieldType {

	static slug = "date"

	constructor(...args) {
		super(...args);
	}

	value( value = null){

		console.log("value", value)
		if(!value){
			return null
		}

		if( ! isMatch(value, MYSQL_DATE_FORMAT ) ) {
			return null
		}

		const dateValue = parse(value, MYSQL_DATE_FORMAT.replace("-", "'-'"), new Date() )

		

		if (typeof dateValue !== "object"){
			return null
		}

		if(!(dateValue instanceof Date)){
			return null
		}

		console.log("dateValue", dateValue)
		
		return dateValue
	}
}

