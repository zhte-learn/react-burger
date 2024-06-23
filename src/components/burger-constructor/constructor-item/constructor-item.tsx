import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core'

import itemStyles from './constructor-item.module.css';
import PriceBlock from '../../price-block/price-block';
import { BurgerIngredient } from '../../../utils/custom-types';
import { LockIcon, DeleteIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../services/hooks';
import { removeIngredient } from '../../../services/burger-constructor/reducer';

interface ConstructorItemProps {
  item: BurgerIngredient,
  position: string,
  index: number,
  isHover: boolean,
  mRef?: React.Ref<HTMLDivElement>,
  moveItem?: (dragIndex: number, hoverIndex: number) => void,
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ConstructorItem = React.forwardRef<HTMLDivElement, ConstructorItemProps>((props, ref) => {
  const dispatch = useAppDispatch();

  const name = (props.position === 'top') ? `${props.item.name} (верх)`
                : (props.position === 'bottom') ? `${props.item.name} (низ)`
                : props.item.name;
  
  const shapeStyle = (props.position === 'top') ? itemStyles.top
                      : (props.position === 'bottom') ? itemStyles.bottom
                      : itemStyles.middle;
  
  const onHoverStyle = (props.isHover) ? itemStyles.onHover : '';
  const extraClass = (props.position === 'top' || props.position === 'bottom') ? 'mr-4' : '';

  function handleDelete() {
    const uniqueId = props.item.uniqueId || "";
    dispatch(removeIngredient(uniqueId));
  }

  const sortRef = React.useRef<HTMLLIElement>(null);

  const [{ isHoverItem, handlerId }, drop] = useDrop<DragItem, void, {isHoverItem: boolean, handlerId: Identifier|null}>({
    accept: "draggable",
    collect(monitor) {
      return{
        handlerId: monitor.getHandlerId(),
        isHoverItem: monitor.isOver(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!sortRef.current) {
        return;
      }
    const dragIndex = item.index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = sortRef.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveItem?.(dragIndex, hoverIndex);

    item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: "draggable",
    item: () => {
      return { id: props.item._id, index: props.index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  const itemHoverClass = (isHoverItem ? itemStyles.onHover : '');
  drag(drop(sortRef));

  return(
    <li ref={sortRef} style={{opacity}} data-handler-id={handlerId} className={`${itemStyles.item} ${extraClass} ${itemHoverClass}`}>
      {
        props.position === 'middle' && <DragIcon type="primary" />
      }
      
      <div ref={ref} className={`${itemStyles.container} ${shapeStyle} ${onHoverStyle} pr-8 pl-6 ml-1`}>
        <div className={`${itemStyles.details} pt-4 pb-4 pr-8`}>
          <img 
            className={`${itemStyles.image}`} 
            src={props.item.image_mobile} 
            alt={props.item.name} 
          />
          <p className={`${itemStyles.name} text text_type_main-small ml-5`}>{name}</p>
        </div>

        <div className={itemStyles.controls}>
          <PriceBlock size={'small'} price={props.item.price}/>
          { 
            props.position === 'middle'
            ? <DeleteIcon type="primary" onClick={handleDelete}/>
            : <LockIcon type="secondary" />
          }
        </div>
      </div>
    </li>
  )
});

export default ConstructorItem;