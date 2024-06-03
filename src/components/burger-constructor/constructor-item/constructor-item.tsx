import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core'

import itemStyles from './constructor-item.module.css';
import PriceBlock from '../../price-block/price-block';
import BurgerIngredient from "../../../utils/ingredient-interface";
import { LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { removeIngredient } from '../../../services/constructor/actions';

interface IngredientItemProps {
  item: BurgerIngredient,
  name: string,
  index: number,
}

interface DragItem {
  index: number,
  id: string,
  type: string,
}

function ConstructorItem(props: IngredientItemProps) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(removeIngredient(props.item._id));
  }

  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ['sauce', 'main'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
      //moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  })

  /*const [{ isDragging }, drag] = useDrag({
    type: props.item.type,
    item: () => {
      return { props.item._id, props.item.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));*/

  return(
    <div className={`${itemStyles.container} pr-8 pl-6 ml-1`}>
      <div className={`${itemStyles.details} pt-4 pb-4 pr-8`}>
        <img 
          className={`${itemStyles.image}`} 
          src={props.item.image_mobile} 
          alt={props.item.name} 
        />
        <p className={`${itemStyles.name} text text_type_main-small ml-5`}>{props.name}</p>
      </div>

      <div className={itemStyles.controls}>
        <PriceBlock size={'small'} price={props.item.price}/>
        { 
          props.item.type !== 'bun'
          ? <DeleteIcon type="primary" onClick={handleDelete}/>
          : <LockIcon type="secondary" />
        }
      </div>
    </div>
  )
}

export default ConstructorItem;