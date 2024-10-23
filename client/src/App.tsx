import useRouteElement from './hooks/useRouteElement';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const routeElement = useRouteElement();
  return (
    <div className='text-primary'>
      {routeElement}
      <Toaster position='top-right' richColors toastOptions={{}} theme='light' />
    </div>
  );
}

export default App;
