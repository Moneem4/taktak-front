import React, { useContext } from 'react';
import { UiContext } from '../../../context/UiContext';
import CustomizeMenuHeader from './CustomizeMenuHeader';
import MenuPersonalizeCard from './MenuPersonalizeCard';
import MenuList from '../../profileRestaurant/menu/MenuList';

function CustomizeMenu(props) {
    const {} = props;
    const {menu, myMenu} = useContext(UiContext);
    
    return (
        <div className="tabs-panel is-active" id="panel3">

            <CustomizeMenuHeader />
            <MenuList  />
            
            <div className="menu-first-panel">
                <div className="title">
                    <span>Vous avez ajouté ({4}) articles dans Pizza.</span>
                </div>
                <div className="menu-first">
                    <div className="menu-body">
                        {myMenu[menu].articles.map((article) => (
                            <MenuPersonalizeCard article={article} key={article.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

CustomizeMenu.propTypes = { }

export default CustomizeMenu