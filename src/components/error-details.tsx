import { useAppSelector } from '../services/hooks';
import Loader from '../components/loader/loader';

function ErrorDetails() {
  const { isFailed, isLoading, errorMessage } = useAppSelector(state => state.user);

  return (
    
      
        <p className="text text_type_main-medium">{errorMessage}</p>
      
  )
}

export default ErrorDetails;
