import loaderStyles from './loader.module.css';

function Loader() {
  return(
    <div className={loaderStyles.container}>
      <div className={loaderStyles.loader}></div> 
    </div>
   ) 
}

export default Loader;