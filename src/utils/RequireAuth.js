import Loader from "@/app/components/common/Loader";
import { useAuth } from "@/app/contexts/AuthContext";

const RequireAuth = (Component) => {
  const WrapperComponent = (props) => {
    const { user, loading} = useAuth();

    if(loading) return <Loader/>;

    if (!user) {
      // Redirect to login if the user is not authenticated
      window.location = '/login';
      return null;
    }

    return <Component {...props}/>;
  };

  WrapperComponent.displayName = `RedirectIfAuth(${Component.displayName || Component.name || 'Component'})`;

  return WrapperComponent;
};

export default RequireAuth;
