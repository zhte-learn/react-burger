import { FC } from 'react';
import loaderStyles from './loader.module.css';

const Loader: FC = () => {
  return(
    <div className={`${loaderStyles.container} mt-6`}>
      <div className={loaderStyles.loader}></div> 
    </div>
   ) 
}

export default Loader;