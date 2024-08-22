import { useNavigate } from 'react-router-dom';


const useNavigationUtil = () => {
    const navigate = useNavigate();
  
    const goTo = (path) => {
      navigate(path);
    };
  
    return { goTo };
};
export default useNavigationUtil;