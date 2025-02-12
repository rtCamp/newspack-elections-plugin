import {useSelect, useDispatch} from "@wordpress/data";
import {store as editorStore} from "@wordpress/editor"
import {store as coreStore} from "@wordpress/core-data"

export const usePanel = () => {

	const {editEntityRecord} = useDispatch("core");

	const {postType, postId} = useSelect( (select) => {

		return {
			postType : select( editorStore ).getCurrentPostType(),
			postId : select( editorStore ).getCurrentPostId()
		}
	})

	const meta = useSelect( (select) => {
		
		return select( coreStore ).getEditedEntityRecord('postType', postType, postId)?.meta ?? {}
	}, [postId, postType] )

	
	const setPostMeta = (newMeta) => {
		editEntityRecord( 'postType', postType, postId, { meta: {
			...meta,
			...newMeta 
		} } )
	}

	const setTerm = async (taxonomy, term ) => {

		const _taxonomy = await useSelect( (select) => {
			return select(coreStore).getTaxonomy(taxonomy)
		});

		editPost( { [ _taxonomy.rest_base ]: term } );
	}

	return {
		//...req,
		setPostMeta,
		//setTerm
	}
}

export default usePanel