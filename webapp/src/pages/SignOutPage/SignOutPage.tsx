import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getSignInRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  useEffect(() => {
    Cookies.remove('token');
    void trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute());
    });
  }, []);
  return <p>Loading...</p>;
};
