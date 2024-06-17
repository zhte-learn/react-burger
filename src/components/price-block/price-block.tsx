import React from "react";
import price from './price-block.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface PriceBlockProps {
  price: number;
  size: string;
}

function PriceBlock(props: PriceBlockProps) {
  const textStyle = (props.size === 'small') 
    ? 'text text_type_digits-default'
    : 'text text_type_digits-medium';

  return(
    <div className={`${ price.container } mr-5`}>
      <p className={`${ textStyle } mr-2`}>{ props.price }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default PriceBlock;