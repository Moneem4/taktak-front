import React from 'react';

function SideBarVisiteGuide(props) {
    const {} = props;

    return (
        <div className="taktak-visit">
            <div className="taktak-visit-title">
                <span className="title">Visite guidée sur TAKTAK</span>
                <span className="description">
                    Explorez notre plateforme d’une façon intéractive et
                    découvrez nos services.
                </span>
            </div>
            <div className="taktak-visit-video">
                <i className="far fa-play-circle" />
            </div>
        </div>
    )
}

SideBarVisiteGuide.propTypes = {

}

export default SideBarVisiteGuide