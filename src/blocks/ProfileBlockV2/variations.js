import {justifyLeft, layout, mediaAndText} from "@wordpress/icons"

export const variations = [
	{
		'name' : "gp-profile-full",
		'title' : "Full Profile",
		'description' : "Profile",
		isDefault : true,
		icon : layout,
		attributes : {
			width : "wide",
			"backgroundColor":"base-2"
		}
	},
	{
		'name' : "gp-profile-full-inline",
		'title' : "Inline Profile",
		isDefault : false,
		icon : mediaAndText,
		attributes : {
			width : "thin",
			align: "left",
			"style": {
				"spacing":{
					"blockGap":"0"
				},
			},
			"layout":{ 
				"type":"flex",
				"orientation":"vertical",
				"justifyContent":"stretch"
			}
		},
		"innerBlocks" : [
			[
				"core/post-featured-image", 
				{"isLink":true,"aspectRatio":"2/3","style":{"layout":{"selfStretch":"fit","flexSize":null},"border":{"radius":"0px"}}}
			],
			[
				"core/group",
				{"style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|10","right":"var:preset|spacing|10"}}},"layout":{"type":"constrained"}},
				[
					[
						"core/post-title",
						{"isLink":true},
						[]
					],
					[
						"govpack/profile-row-group",
						{"separatorStyles":{"height":"1px","spacing":{"margin":{"top":"0","bottom":"0"}}},"style":{"layout":{"selfStretch":"fill","flexSize":null},"spacing":{"blockGap":"7px"}}},
						[ 
							[
								"govpack/profile-row",
								{"fieldKey":"legislative_body","fieldType":"taxonomy"}
							],
							[
								"govpack/profile-separator"
							],
							[
								"govpack/profile-row", 
								{"fieldKey":"party","fieldType":"taxonomy"}
							],
							[
								"govpack/profile-separator", {}
							],
							[	
								"govpack/profile-row",
								{"fieldKey":"endorsements","fieldType":"text"},
								[]
							]
						]
					],
					[
						"core/post-excerpt",
						{"moreText":" ","showMoreOnNewLine":false,"excerptLength":27},
						[]
					]
				]
			]
		]
			
	},
	{
		'name' : "gp-profile-mini",
		'title' : "Mini Profile",
		isDefault : false,
		icon : justifyLeft,
		example : {
			attributes : {
				"preview" : true,
				"width" : "wide",
				"align": "left",
				"backgroundColor":"accent",
				"verticalAlignment":"center",
				"fontSize":"medium",
				"textColor":"base-2",
				"style":{
					"spacing":{
						"padding":{
							"top":"0.5rem","bottom":"0.5rem","left":"0.5rem","right":"0.5rem"}
					},
					"typography":{ "textAlign":"left" },
					"dimensions" : { "minHeight" : "10rem" }
				},
				"layout":{
					"type":"flex",
					"verticalAlignment":"middle",
					"justifyContent":"left",
					"flexWrap":"nowrap"
				},
			},
			innerBlocks : [
				{
					name : "core/post-featured-image", 
					attributes :{"style":{"layout":{"selfStretch":"fixed","flexSize":"130px"},"border":{"radius":"100px"}}}
				},
				{
					name : "core/group", 
					attributes : {"style":{"spacing":{"blockGap":"0.2rem"},"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"constrained"}} , 
					innerBlocks: [
						{
							name : "core/post-title", 
							attributes : {"style":{"typography":{"fontStyle":"normal","fontWeight":"1000","fontSize":"1.4rem"},"spacing":{"padding":{"bottom":"0.5rem"}}}}, 
							innerBlocks : []
						},
						{
							name :"govpack/profile-field-term", 
							attributes :{"taxonomy":"govpack_legislative_body","fontSize":"small"}, 
							innerBlocks : []
						},
						{
							name :"govpack/profile-field-term", 
							attributes :{"taxonomy":"govpack_party","fontSize":"small"}, 
							innerBlocks :[]
						},
						{
							name :"govpack/profile-field-term", 
							attributes :{"taxonomy":"govpack_officeholder_status","fontSize":"small"}, 
							innerBlocks :[]
						}
					]
				}
			]
		},
		attributes : {
			"width" : "wide",
			"align": "left",
			"backgroundColor":"accent",
			"verticalAlignment":"center",
			"fontSize":"medium",
			"textColor":"base-2",
			"style":{
				"spacing":{
					"padding":{
						"top":"0.5rem","bottom":"0.5rem","left":"0.5rem","right":"0.5rem"}
				},
				"typography":{"textAlign":"left"},
				"dimensions" : { "minHeight" : "10rem" }
			},
			"layout":{
				"type":"flex",
				"verticalAlignment":"middle",
				"justifyContent":"left",
				"flexWrap":"nowrap"
			},
			
		},
		innerBlocks : [
			[
				"core/post-featured-image", 
				{"style":{"layout":{"selfStretch":"fixed","flexSize":"130px"},"border":{"radius":"100px"}}}
			],
			[
				"core/group", 
				{"style":{"spacing":{"blockGap":"0.2rem"},"layout":{"selfStretch":"fill","flexSize":null}},"layout":{"type":"constrained"}} , 
				[
					["core/post-title", {"style":{"typography":{"fontStyle":"normal","fontWeight":"1000","fontSize":"1.4rem"},"spacing":{"padding":{"bottom":"0.5rem"}}}}, []],
					["govpack/profile-field-term", {"taxonomy":"govpack_legislative_body","fontSize":"small"}, []],
					["govpack/profile-field-term", {"taxonomy":"govpack_party","fontSize":"small"}, []],
					["govpack/profile-field-term", {"taxonomy":"govpack_officeholder_status","fontSize":"small"}, []]
				]
			]
		]
	}
]