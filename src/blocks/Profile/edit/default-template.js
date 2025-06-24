const DEFAULT_ROW_PARTY = [ "npe/profile-row", {
	showLabel : false,
	field : {
		"key":"party",
		"type":"taxonomy"
	},
	fontFamily: "system-sans-serif",
	fontSize: "small",
	style : {
		typography: {
			fontWeight: "700"
		}
	}
}, []]

const DEFAULT_ROW_STATUS = [ "npe/profile-row", {
	showLabel : false,
	field : {
		"key":"status",
		"type":"taxonomy"
	},
	fontFamily: "system-sans-serif",
	fontSize: "small",
	style : {
		typography: {
			fontWeight: "500"
		}
	}
}, []]

export const DEFAULT_TEMPLATE = [
	[ "core/post-featured-image", {
		"isLink":true,
		"aspectRatio":"1"
	}, []],
	[ "npe/profile-row-group", {
		"style":{
			"spacing":{
				"padding":{
					"top":"var:preset|spacing|40",
					"bottom":"var:preset|spacing|40",
					"left":"var:preset|spacing|40",
					"right":"var:preset|spacing|40",
				},
				"blockGap":"var:preset|spacing|0"
			}
		}
		},[
			[ "npe/profile-name", {}, []],
			DEFAULT_ROW_PARTY,
			DEFAULT_ROW_STATUS,
		]
	]
]


export const HORIZONTAL_TEMPLATE = [
	[ "core/post-featured-image", {
		isLink: true,
		aspectRatio: "1",
		width: "100px",
		height: "100%",
		style: {
			layout: {
				selfStretch: "fixed",
				flexSize:"150px"
			}
		}
	}, []],
	[ "npe/profile-row-group", {
		"style":{
			"spacing":{
				"padding":{
					"top":"var:preset|spacing|40",
					"bottom":"var:preset|spacing|40",
					"left":"var:preset|spacing|40",
					"right":"var:preset|spacing|40"
				},
				"blockGap":"var:preset|spacing|40"
			},
			"layout":{
				"selfStretch":"fill",
				"flexSize":null
			}
		}
		},[
			[ "npe/profile-name", {}, []],
			DEFAULT_ROW_PARTY,
			DEFAULT_ROW_STATUS,
		]
	]
]