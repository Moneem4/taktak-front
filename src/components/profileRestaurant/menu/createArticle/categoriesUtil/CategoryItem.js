import React, { useRef } from 'react'
import Input from "@material-ui/core/Input";
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};


function CategoryItem({ id, text, index, moveCard ,editInput,edit,handleChangeEdit,editCategory,removeCategory,handleKeyDownEdit}) {

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
			 <div className="added-category" ref={ref} style={{  opacity }} data-handler-id={handlerId} >
              <span  style={{ display: edit === id ? "none" : "block" }} >
                {text}
              </span>
              <Input
                value={editInput}
                inputProps={{ "aria-label": "description" }}
                onChange={handleChangeEdit}
                onKeyDown={(e) => handleKeyDownEdit(e, id)}
                style={{
                  display: edit === id ? "block" : "none",
                  fontSize: 15,
                }}
              />
              <div className="icons">
                <i
                  className="fal fa-pen"
                  onClick={() => editCategory(id, text)}
                />
                <i
                  className="fal fa-trash-alt"
                  onClick={() => removeCategory(id)}
                />
                <i className="fal fa-arrows-alt" />
              </div>
            </div>
		);
};



export default CategoryItem

