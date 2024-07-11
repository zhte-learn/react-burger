import styles from './price-block.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type PriceBlockProps = {
  price: number;
  size: string;
}

const PriceBlock = ({ price, size }: PriceBlockProps): JSX.Element => {
  const textStyle = (size === 'small') 
    ? 'text text_type_digits-default'
    : 'text text_type_digits-medium';

  return(
    <div className={`${ styles.container }`}>
      <p className={`${ textStyle } mr-2`}>{ price }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default PriceBlock;
