import { forwardRef, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core'

import itemStyles from './constructor-item.module.css';
import PriceBlock from '../../price-block/price-block';
import { TBurgerIngredient } from '../../../utils/custom-types';
import { LockIcon, DeleteIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../services/hooks';
import { removeIngredient } from '../../../services/burger-constructor/reducer';

type ConstructorItemProps = {
  item: TBurgerIngredient;
  position: string;
  index: number;
  isHover: boolean;
  mRef?: React.Ref<HTMLDivElement>;
  moveItem?: (dragIndex: number, hoverIndex: number) => void;
}

type TDragObject = {
  id: string;
  index: number;
  type: "bun" | "main" | "sause";
}

type TDropCollectedProps = {
  handlerId: Identifier | null;
  isHoverItem: boolean;
}

type TDragCollectedProps = {
  isDragging: boolean;
}

const ConstructorItem = forwardRef<HTMLDivElement, ConstructorItemProps>((props, ref): JSX.Element => {
  const dispatch = useAppDispatch();

  const name: string = (props.position === 'top') ? `${props.item.name} (верх)`
                      : (props.position === 'bottom') ? `${props.item.name} (низ)`
                      : props.item.name;
  
  const shapeStyle: string = (props.position === 'top') ? itemStyles.top
                            : (props.position === 'bottom') ? itemStyles.bottom
                            : itemStyles.middle;
  
  const onHoverStyle: string = (props.isHover) ? itemStyles.onHover : '';
  const extraClass: string = (props.position === 'top' || props.position === 'bottom') ? 'mr-4' : '';

  function handleDelete(): void {
    const uniqueId = props.item.uniqueId || "";
    dispatch(removeIngredient(uniqueId));
  }

  const sortRef = useRef<HTMLLIElement | null>(null);

  const [{ isHoverItem, handlerId }, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
    accept: "draggable",
    collect(monitor) {
      return{
        handlerId: monitor.getHandlerId(),
        isHoverItem: monitor.isOver(),
      }
    },
    hover(item: TDragObject, monitor) {
      if (!sortRef.current) {
        return;
      }
    const dragIndex: number = item.index;
    const hoverIndex: number = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect: DOMRect = sortRef.current?.getBoundingClientRect();
    const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset: XYCoord | null = monitor.getClientOffset();
    const hoverClientY: number = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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

  const [{ isDragging }, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
    type: "draggable",
    item: () => {
      return { id: props.item._id, index: props.index, type: props.item.type }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity: number = isDragging ? 0 : 1;
  const itemHoverClass: string = (isHoverItem ? itemStyles.onHover : '');
  drag(drop(sortRef));

  return(
    <li ref={sortRef} style={{opacity}} data-handler-id={handlerId} className={`${itemStyles.item} ${extraClass} ${itemHoverClass}`}>
      {
        props.position === 'middle' && <DragIcon type="primary" />
      }
      
      <div ref={ref} className={`${itemStyles.container} ${shapeStyle} ${onHoverStyle} pr-8 pl-6 ml-1`}>
        <div className={`${itemStyles.details} pt-4 pb-4`}>
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
