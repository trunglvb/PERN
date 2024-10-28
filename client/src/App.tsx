import { useEffect } from 'react';
import useRouteElement from './hooks/useRouteElement';
import { Toaster } from '@/components/ui/sonner';
import useUserStore from './zustand/useUserStore';
import { LocalStorageEventTarget } from './utils/utils';

function App() {
  const routeElement = useRouteElement();
  const { resetUserState } = useUserStore();

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', resetUserState);
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', resetUserState);
    };
  }, [resetUserState]);
  return (
    <div className='text-primary'>
      {routeElement}
      <Toaster position='top-right' richColors toastOptions={{}} theme='light' />
    </div>
  );
}

export default App;
