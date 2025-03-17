export const DEFAULT_TEMPLATE = [
	[ "core/post-featured-image", {
		"isLink":true,
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
			[ "govpack/profile-row", {
				"field" : {
					"key":"party",
					"type":"taxonomy"
				}
			}, []],
			[ "govpack/profile-row", {
				"field" : {
					"key":"legislative_body",
					"type":"taxonomy"
				}
			}, []],
			[ "govpack/profile-row", {
				"field" : {
					"key":"position",
					"type":"taxonomy"
				}
			}, []],
			[ "govpack/profile-row", {
				"field" : {
					"key":"status",
					"type":"taxonomy"
				}
			}, []]
		]
	]
]