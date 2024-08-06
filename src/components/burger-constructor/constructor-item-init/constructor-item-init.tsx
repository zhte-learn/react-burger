import { forwardRef } from 'react';
import styles from './constructor-item-init.module.css';

type ConstructorItemInitProps = {
  position: string;
  isHover: boolean;
  text: string;
  mRef?: React.Ref<HTMLDivElement>;
}

const ConstructorItemInit = forwardRef<HTMLDivElement, ConstructorItemInitProps>((props, ref): JSX.Element => {
  const shapeStyle: string = (props.position === 'top') ? styles.top
                          : (props.position === 'bottom') ? styles.bottom
                          : styles.middle;
  
  const onHoverStyle: string = (props.isHover) ? styles.onHover : '';

  const testDataAttribute: string = (props.position === 'middle') 
                                    ? 'drop-zone-fillings'
                                    : 'drop-zone-bun'
  
  return (
    <div 
      ref={ref}
      data-testid={testDataAttribute} 
      className={`${styles.container} ${shapeStyle} ${onHoverStyle} pr-8 pl-6 mr-4 `}
    >
      <p className={`${styles.text} text text_type_main-small pt-6 pb-6`}>
        {props.text}
      </p>
    </div>
  )
});

export default ConstructorItemInit;
