import OrdersList from '../components/orders-list/orders-list';
import styles from './styles.module.css';

export const FeedPage = (): JSX.Element => {
  return (
    <section className={styles.feedContainer}>
      <h1 className="text text_type_main-large pl-5 mt-8">Лента заказов</h1>
      <div className={`${styles.feedContent} mt-5`}>
        <div className={styles.columnWrapper}>
          <OrdersList />
        </div>
        <div className={styles.columnWrapper}>
          <div className={`${styles.feedData} pr-5`}>
            <div className={styles.columns}>
              <div className={styles.feedsReady}>
                <h3 className="text text_type_main-medium">Готовы:</h3>
                <div className={`${styles.ordersNumbers} mt-6`}>
                  <p className={`${styles.activeColor} text text_type_digits-default`}>034533</p>
                  <p className={`${styles.activeColor} text text_type_digits-default`}>034535</p>
                  <p className={`${styles.activeColor} text text_type_digits-default`}>034545</p>
                  <p className={`${styles.activeColor} text text_type_digits-default`}>034577</p>
                  <p className={`${styles.activeColor} text text_type_digits-default`}>034599</p>
                </div>
              </div>
              <div className={styles.feedsInProcess}>
                <h3 className="text text_type_main-medium">В работе:</h3>
                <div className={`${styles.ordersNumbers} mt-6`}>
                  <p className={`text text_type_digits-default`}>034533</p>
                  <p className={`text text_type_digits-default`}>034535</p>
                  <p className={`text text_type_digits-default`}>034545</p>
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
