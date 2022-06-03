import Routers from './route/route';
import { withCookies } from 'react-cookie';

function App() {
  return (
      <Routers/>
  );
}

export default withCookies(App);
