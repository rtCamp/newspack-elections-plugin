const path = require( 'path' );
const fs = require( 'fs' );

let defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { getWebpackEntryPoints, getPackageProp, hasPackageProp, getProjectSourcePath} = require("@wordpress/scripts/utils")
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { optimize } = require('svgo');
const TerserPlugin = require( 'terser-webpack-plugin' );

function getEntryPoints(){
	return {
		...getWebpackEntryPoints("script")(),
		...getEntryPointsFromPackage()
	}
}

function pathToEntry(filePath){
	const entryName = path.basename( filePath, '.js' );

	if ( ! filePath.startsWith( './' ) ) {
		filePath = './' + filePath;
	}

	return [ entryName, filePath ];
};

const terserOptions = {
	parallel: true,
	terserOptions: {
		output: {
			comments: /translators:/i,
		},
		compress: {
			passes: 2,
			drop_console: true
		},
		mangle: {
			reserved: [ '__', '_n', '_nx', '_x' ],
		},
	},
	extractComments: false,
}

/*
const minifier = new TerserPlugin( terserOptions )
*/

function getEntryPointsFromPackage(){
	
	let entryPoints = {}
	
	
	if(!hasPackageProp('config')){
		return entryPoints
	}

	const pkgConfig = getPackageProp("config")
	if(!pkgConfig.hasOwnProperty("entrypoints")){
		return entryPoints
	}

	if(Array.isArray(pkgConfig.entrypoints)){

		pkgConfig.entrypoints.forEach( (path, index) => {
			const [ entryName, entryPath ] = pathToEntry(path)
			entryPoints[entryName] = entryPath
		});

	} else if(typeof pkgConfig.entrypoints === "object"){

		entryPoints = {
			...entryPoints,
			...pkgConfig.entrypoints
		}
	}
	


	return entryPoints

}


function blockScripts( type, inputDir, blocks ) {
	return blocks
		.map( block => path.join( inputDir, 'blocks', block, `${ type }.js` ) )
		.filter( fs.existsSync );
}

const blocksDir = path.join( __dirname, 'src', 'blocks' );
const blocks = fs.readdirSync( blocksDir )
	.filter( block => fs.existsSync( path.join( __dirname, 'src', 'blocks', block, 'index.js' ) ) );





defaultConfig = {
	...defaultConfig,
	optimization : {
		...defaultConfig.optimization,
		minimizer : [
			new TerserPlugin( terserOptions )
		]
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyWebpackPlugin({
			patterns: [{
				context: getProjectSourcePath(),
				from : "assets/icons/**/*.svg",
				to : "icons/[name][ext]",
				transform : {
					transformer(content, absoluteFrom) {
						//console.log(content.toString())
						//return content.toString();
						let result = optimize(content.toString())
						return result.data;
					}
				}
			}]
		})
	]
}

function getBlockDir(){
	return path.join( __dirname, 'src', 'blocks' );
}

/**
 * gets an array containiung a path for block's folder
 * 
 * @returns array
 */

function getBlocks(){
	/**
	 * Reads the whole directory then filters all directory 
	 * entries by isDirectory. Finally return a path for
	 * each block.
	 */
	const paths = fs.readdirSync( getBlockDir(), {"withFileTypes" : true} )
		.filter( (dirent) => dirent.isDirectory())
		.map(dirent => dirent.name )
	
	return paths
}

function getBlockViewScripts(){
	

	const blocks = getBlocks()
		.filter( block => fs.existsSync( path.join( getBlockDir(), block, 'view.js' ) ) );

	const viewBlocksScripts = blocks.reduce( ( viewBlocks, block ) => {
		viewScriptPath = path.join( getBlockDir(), block, 'view.js' );
		let fileExists = fs.existsSync( viewScriptPath );
		if ( !fileExists ) {
			// Try TS.
			viewScriptPath = path.join( getBlockDir(), block, 'view.ts' );
			fileExists = fs.existsSync( viewScriptPath );
		}
		if ( fileExists ) {
			viewBlocks[ 'blocks/' + block + '/view' ] = viewScriptPath;
		}
		return viewBlocks;
	}, {} );

	return viewBlocksScripts
}

function getBlockEditorScripts(){

	const blocks = fs.readdirSync( getBlockDir() ).filter( block => fs.existsSync( path.join( __dirname, 'src', 'blocks', block, 'index.js' ) ) );

	return {
		"npe-blocks" : [
		//	path.join( __dirname, 'src', "block-editor", "index.js"),
			...blockScripts( 'index', path.join( __dirname, 'src' ), blocks )
		]
	}
}

function getEntryPointsv2(){

	//console.log( getBlockViewScripts() )
	return {
		...getBlockEditorScripts(),
		...getEntryPointsFromPackage(),
		...getBlockViewScripts(),
		"npe-editor" : {
			import : './src/block-editor/index.js',
			library: {
				name: [ 'npe', 'editor' ],
				type: 'window'
			},
		}
	}
	
}

const DependencyRequestMap = {
	"@npe/editor" : [
		["window", "npe", "editor"],
		"npe-editor"
	]
}

function requestToExternal( request ){
	
	if(request in DependencyRequestMap){
		return DependencyRequestMap[request][0]
	}
}

function requestToHandle( request ){
	if(request in DependencyRequestMap){
		return DependencyRequestMap[request][1]
	}
}


console.log(defaultConfig.resolve)
module.exports = {
    ...defaultConfig,
	output:{
		...defaultConfig.output,
		enabledLibraryTypes: ['window'],
	},
	resolve: {
		...defaultConfig.resolve,
		alias : {
			...defaultConfig.resolve.alias,
			"@npe/editor" : path.resolve(__dirname, "src/block-editor")
		}
	},
	plugins : [
		...defaultConfig.plugins.filter( ( plugin ) => {
			return plugin.constructor.name !== "DependencyExtractionWebpackPlugin"
		}),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: false,
			requestToExternal,
			requestToHandle,
			externalizedReport: true
		})
	],
	entry: getEntryPointsv2
};  
