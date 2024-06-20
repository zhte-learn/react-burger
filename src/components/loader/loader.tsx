import loaderStyles from './loader.module.css';

function Loader() {
  return(
    <div className={`${loaderStyles.container} mt-6`}>
      <div className={loaderStyles.loader}></div> 
    </div>
   ) 
}

export default Loader;