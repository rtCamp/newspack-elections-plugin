export const DEFAULT_TEMPLATE = [
	[ "core/post-featured-image", {
		"isLink":true,
		"aspectRatio":"1"
	}, []],
	[ "npe/profile-row-group", {
		"style":{
			"spacing":{
				"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|10","right":"var:preset|spacing|10"},
				"blockGap":"var:preset|spacing|10"
			}
		}
		},[
			[ "npe/profile-name", {
				"isLink":true
			}, []],
			[ "npe/profile-row", {
				"field" : {
					"key":"party",
					"type":"taxonomy"
				}
			}, []],
			
			[ "npe/profile-row", {
				"field" : {
					"key":"position",
					"type":"taxonomy"
				}
			}, []],
			[ "npe/profile-row", {
				"field" : {
					"key":"status",
					"type":"taxonomy"
				}
			}, []]
		]
	]
]