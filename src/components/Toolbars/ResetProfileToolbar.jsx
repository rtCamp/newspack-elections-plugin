
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { Icon, postAuthor} from '@wordpress/icons';


const ResetProfileToolbar = (props) => {

    const {
        setProfile,
    } = props


    return ( 
        <BlockControls>
            <Toolbar
                controls={ [
                    {
                        icon: <Icon icon={ postAuthor } />,
                        title: __( 'Modify Selection', 'govpack' ),
                        onClick: () => {
                            setProfile( null );
                        },
                    },
                ] }
            />
        </BlockControls>
    )
}

export default ResetProfileToolbar