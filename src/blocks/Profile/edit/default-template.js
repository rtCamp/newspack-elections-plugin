export const DEFAULT_TEMPLATE = [
	[ "core/post-featured-image", {
		"isLink":true,
		"aspectRatio":"1"
	}, []],
	[ "npe/profile-row-group", {
		"style":{
			"spacing":{
				"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|10","right":"var:preset|spacing|10",},
				"blockGap":"var:preset|spacing|0"
			}
		}
		},[
			[ "npe/profile-name", {
				level: 4,
				isLink: false,
				fontSize: "medium",
				fontFamily: "system-sans-serif",
				style: {
					typography: {
						fontWeight: "1000"
					}
				}
			}, []],
			[ "npe/profile-row", {
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
			}, []],
			
			[ "npe/profile-row", {
				"showLabel": false,
				"field" : {
					"key":"status",
					"type":"taxonomy"
				},
				fontFamily: "system-sans-serif",
				fontSize: "small",
			}, []],

		]
	]
]