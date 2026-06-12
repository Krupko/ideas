import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { trpc } from '../../../lib/trpc';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { useNavigate } from 'react-router-dom';
import { getAllIdeasRoute } from '../../../lib/routes';

export const SignOutPage = withPageWrapper({
  // redirectAuthorized: true,
})(() => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  useEffect(() => {
    Cookies.remove('token');
    void trpcUtils.invalidate().then(() => {});
    navigate(getAllIdeasRoute());
  }, [navigate, trpcUtils]);
  return <p>Loading...</p>;
});
