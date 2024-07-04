import loaderStyles from './loader.module.css';

const Loader = (): JSX.Element => {
  return(
    <div className={`${loaderStyles.container} mt-6`}>
      <div className={loaderStyles.loader}></div> 
    </div>
   ) 
}

export default Loader;