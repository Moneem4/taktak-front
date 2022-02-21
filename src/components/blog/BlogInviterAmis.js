import React from 'react';

function BlogInviterAmis(props) {
    
    return (
        <div className="blog-invite-friends">
            <div className="blog-invite-friends-left">
                <i className="fal fa-user-friends" />
                <div>
                    <span>Invitez vos amis à lire vos articles</span>
                    <p>
                        Mauris placerat mi ac eros mollis, sit amet porta leo
                        scelerisque. Fusce sagittis pulvinar lorem, vitae tempus
                        dolor aliquet.
                    </p>
                </div>
            </div>
            <div className="blog-invite-friends-right">
                <span>Adresse e-mail</span>
                <div className="blog-invite-friends-input">
                    <input placeholder="Ex: mongi@email.com" />
                    <span className="icon-send" />
                </div>
            </div>
        </div>  
    )
}

BlogInviterAmis.propTypes = {

}

export default BlogInviterAmis