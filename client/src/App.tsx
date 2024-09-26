import useRouteElement from './hooks/useRouteElement'

function App() {
  const routeElement = useRouteElement()
  return (
    <div className='text-primary'>
      {routeElement}
    </div>
  )
}

export default App
