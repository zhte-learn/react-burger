import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import ConstructorItemInit from './constructor-item-init/constructor-item-init';
import Modal from '../modal/modal';
import OrderConfirm from '../order-confirm/order-confirm';
import Loader from '../loader/loader';
import PriceBlock from '../price-block/price-block';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { addBun, addIngredient, moveIngredient, resetConstructor } from '../../services/burger-constructor/reducer';
import { getOrderDetails, resetOrder } from '../../services/order/actions';
import { TBurgerIngredient } from '../../utils/custom-types';

const BurgerConstructor = (): JSX.Element => {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const { orderStatus, orderError } = useAppSelector(state => state.order);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getTotalPrice = useMemo<number>(() => {
    let fillingsPrice: number = 0;
    
    if(fillings.length !== 0) {
      fillings.forEach(function(elem) {
        fillingsPrice += elem.price;
      })
    }
    
    if (bun) {
      return fillingsPrice + bun.price * 2;
    }
    return fillingsPrice;
  }, [bun, fillings]);

  useEffect(() => {
    setTotalPrice(getTotalPrice);
  }, [bun, fillings]);

  function getIngredientsIds(ingredientsList: TBurgerIngredient[]): string[] {
    return ingredientsList.map(item => item._id);
  }

  const makeOrder: () => void = useCallback(() => {
    const ingredientsList: TBurgerIngredient[] = []; // = [bun].concat(fillings);
    if(bun && fillings.length > 0) {
      ingredientsList.push(bun);
      ingredientsList.concat(fillings);
      const ingredientsIds: string[] = (getIngredientsIds(ingredientsList));
      dispatch(getOrderDetails(ingredientsIds.concat(bun._id)));
    }
  }, [bun, fillings]);

  function handleMakeOrder(): void {
    if(!localStorage.getItem("accessToken")) {
      navigate('/login', { replace: true, state: { from: location } });
    } else {
      makeOrder();
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if(fillings.length > 0 && bun) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [bun, fillings]);

  function onDropHandler(item: TBurgerIngredient): void {
    if(item.type === 'bun') {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
  }

  const [{ isHoverBunTop }, dropTargetBunTop] = useDrop({
    accept: 'bun',
    drop: (item: { ingredient: TBurgerIngredient }) => onDropHandler(item.ingredient),
    collect: (monitor: DropTargetMonitor) => ({
      isHoverBunTop: monitor.isOver(),
    }),
  });

  const [{ isHoverBunBottom }, dropTargetBunBottom] = useDrop({
    accept: 'bun',
    drop: (item: { ingredient: TBurgerIngredient }) => onDropHandler(item.ingredient),
    collect: (monitor: DropTargetMonitor) => ({
      isHoverBunBottom: monitor.isOver(),
    }),
  });

  const [{ isHoverFilling }, dropTargetFilling] = useDrop({
    accept: ['sauce', 'main'],
    drop: (item: { ingredient: TBurgerIngredient }) => onDropHandler(item.ingredient),
    collect: (monitor: DropTargetMonitor) => ({
      isHoverFilling: monitor.isOver(),
    }),
  });

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient({dragIndex, hoverIndex}));
  }, []);

  function closeModal(): void {
    setIsModalOpen(false);
    //remove fixed position of background when modal is closed
    document.body.style.overflow = "unset";
    dispatch(resetOrder());
    dispatch(resetConstructor());
  }

  return(
    <>
    <section className={`${styles.container} pt-25 mb-15`}>
      <>
        {bun ? (
          <ConstructorItem 
            ref={dropTargetBunTop}
            item={bun} 
            position={'top'}
            index={0}
            isHover={isHoverBunTop}
          />
        ) : (
          <ConstructorItemInit 
            ref={dropTargetBunTop} 
            position={'top'}
            isHover={isHoverBunTop}
            text={'Выберите булку'}
          />
        )}

        {fillings.length == 0 ? (
          <ConstructorItemInit 
            ref={dropTargetFilling} 
            position={'middle'}
            isHover={isHoverFilling}
            text={'Выберите начинку'}
          />
        ) : (
          <ul ref={dropTargetFilling} className={styles.list}>
            {fillings.map((elem, index) => (
              <ConstructorItem 
                key={elem.uniqueId}
                item={elem} 
                position={'middle'}
                index={index}
                isHover={isHoverFilling}
                moveItem={moveItem}
              /> 
            ))}
          </ul>
        )}

        {bun ? (
          <ConstructorItem 
            ref={dropTargetBunBottom} 
            item={bun} 
            position={'bottom'}
            index={0}
            isHover={isHoverBunBottom}
          />
          ) : (
          <ConstructorItemInit 
            ref={dropTargetBunBottom} 
            position={'bottom'}
            isHover={isHoverBunBottom}
            text={'Выберите булку'}
          />
        )}
      </>

      <div className={`${styles.order} mt-10 pr-8`}>
        <PriceBlock size="medium" price={totalPrice}/>
        <Button 
          htmlType="button" type="primary" size="large"
          disabled={isDisabled}
          onClick={handleMakeOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>

    {isModalOpen && (
      <Modal onClose={closeModal}>
        {orderStatus === 'failed' && <p className="text text_type_main-medium">{orderError.message}</p>}
        {orderStatus === 'loading' && <Loader />}
        {orderStatus === 'success' && <OrderConfirm />}
      </Modal>
      )}
    </>
  )
}

export default BurgerConstructor;
