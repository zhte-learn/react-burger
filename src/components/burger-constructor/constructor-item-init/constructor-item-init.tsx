import React from "react";
import styles from './constructor-item-init.module.css';

interface ConstructorItemInitProps {
  position: string,
  isHover: boolean,
  text: string;
  mRef?: React.Ref<HTMLDivElement>;
}

const ConstructorItemInit = React.forwardRef<HTMLDivElement, ConstructorItemInitProps>((props, ref) => {
  const shapeStyle = (props.position === 'top') ? styles.top
                      : (props.position === 'bottom') ? styles.bottom
                      : styles.middle;
  
  const onHoverStyle = (props.isHover) ? styles.onHover : '';
  
  return (
    <div ref={ref} className={`${styles.container} ${shapeStyle} ${onHoverStyle} pr-8 pl-6 mr-4 `}>
      <p className={`${styles.text} text text_type_main-small pt-6 pb-6`}>
        {props.text}
      </p>
    </div>
  )
});

export default ConstructorItemInit;
