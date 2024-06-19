import { useAppSelector } from '../services/hooks';
import Loader from '../components/loader/loader';

function ErrorDetails() {
  const { isFailed, isLoading, errorMessage } = useAppSelector(state => state.user);

  return (
    <div className="mt-6">
      {isFailed && 
        <p className="text text_type_main-medium">{errorMessage}</p>
      }
      {isLoading && 
        <Loader />     
      }  
    </div>
  )
}

export default ErrorDetails;
