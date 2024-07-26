import { useEffect } from 'react';
import OrdersList from '../components/orders-list/orders-list';
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';

const FeedPage = (): JSX.Element => {
  const feed = useAppSelector(state => state.feed);
  const orders = feed.orders;
  
  const completeOrders = orders.filter(item => item.status === "done");
  const inProcessOrders = orders.filter(item => item.status === "inProcess");

  return (
    <section>
      <h2 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
      <div className={`${styles.columns} mt-5`}>
        <div className={`${styles.columnWrapper} ${styles.feedHeight}`}>
          {orders && <OrdersList page='feed'/>}
        </div>
        <div className={styles.columnWrapper}>
          <div className={`${styles.feedData} pr-5`}>
            <div className={styles.columns}>
              <div>
                <h3 className="text text_type_main-medium">Готовы:</h3>
                <ul className={`${styles.ordersNumbers} mt-6`}>
                  {completeOrders.map(order => {
                    return(
                      <li 
                        key={order.number}
                        className={`${styles.orderNumber} ${styles.activeColor} text text_type_digits-default`}>
                          {order.number}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className={styles.feedsInProcess}>
                <h3 className="text text_type_main-medium">В работе:</h3>
                <div className={`${styles.ordersNumbers} mt-6`}>
                  {inProcessOrders.map(order => {
                    return(
                      <p className={`text text_type_digits-default`}>{order.number}</p>
                    )
                  })}
                </div>
              </div>
            </div>

            <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
            <p className={`${styles.shadow} text text_type_digits-large`}>{feed.total}</p>
            <h3 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
            <p className={`${styles.shadow} text text_type_digits-large`}>{feed.totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedPage;
