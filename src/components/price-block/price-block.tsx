import { FC } from "react";
import styles from './price-block.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface PriceBlockProps {
  price: number;
  size: string;
}

const PriceBlock: FC<PriceBlockProps> = ({ price, size }) => {
  const textStyle = (size === 'small') 
    ? 'text text_type_digits-default'
    : 'text text_type_digits-medium';

  return(
    <div className={`${ styles.container } mr-5`}>
      <p className={`${ textStyle } mr-2`}>{ price }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default PriceBlock;
