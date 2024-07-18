import OrdersList from '../components/orders-list/orders-list';
import styles from './styles.module.css';

import { orders } from './../utils/data';

const FeedPage = (): JSX.Element => {
  const completeOrders = orders.filter(item => item.status === "done");
  const inProcessOrders = orders.filter(item => item.status === "inProcess");

  return (
    <section>
      <h2 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
      <div className={`${styles.columns} mt-5`}>
        <div className={`${styles.columnWrapper} ${styles.feedHeight}`}>
          <OrdersList />
        </div>
        <div className={styles.columnWrapper}>
          <div className={`${styles.feedData} pr-5`}>
            <div className={styles.columns}>
              <div>
                <h3 className="text text_type_main-medium">Готовы:</h3>
                <div className={`${styles.ordersNumbers} mt-6`}>
                  {completeOrders.map(order => {
                    return(
                      <p className={`${styles.activeColor} text text_type_digits-default`}>{order.orderId}</p>
                    )
                  })}
                </div>
              </div>
              <div className={styles.feedsInProcess}>
                <h3 className="text text_type_main-medium">В работе:</h3>
                <div className={`${styles.ordersNumbers} mt-6`}>
                  {inProcessOrders.map(order => {
                    return(
                      <p className={`text text_type_digits-default`}>{order.orderId}</p>
                    )
                  })}
                </div>
              </div>
            </div>

            <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
            <p className={`${styles.shadow} text text_type_digits-large`}>28 752</p>
            <h3 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
            <p className={`${styles.shadow} text text_type_digits-large`}>138</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedPage;
