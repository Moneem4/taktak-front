import React from 'react'
import { useState, useCallback } from 'react';
import  CategoryItem  from './CategoryItem';
import update from 'immutability-helper';
const style = {
    width: 400,
};

function CategoeiesContainer(props) {
    
        const { cards,setCards,editInput,edit,handleChangeEdit,editCategory,removeCategory,handleKeyDownEdit} =props
        // const [cards, setCards] = useState([
        //     {
        //         id: 1,
        //         text: 'Write a cool JS library',
        //     },
        //     {
        //         id: 2,
        //         text: 'Make it generic enough',
        //     },
        //     {
        //         id: 3,
        //         text: 'Write README',
        //     },
        //     {
        //         id: 4,
        //         text: 'Create some examples',
        //     },
        //     {
        //         id: 5,
        //         text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        //     },
        //     {
        //         id: 6,
        //         text: '???',
        //     },
        //     {
        //         id: 7,
        //         text: 'PROFIT',
        //     },
        // ]);
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);
        const renderCard = (card, index) => {
            return (<CategoryItem 
                key={card._id} 
                index={index} 
                id={card._id} 
                text={card.name} m
                moveCard={moveCard}
                editInput={editInput} 
                edit={edit} 
                handleChangeEdit ={handleChangeEdit}
                editCategory={editCategory} 
                removeCategory={removeCategory}
                handleKeyDownEdit = {handleKeyDownEdit} />);
        };
        return (<>
				<div >{cards && cards.map((card, i) => renderCard(card, i))}</div>
			</>);
    
};


export default CategoeiesContainer

