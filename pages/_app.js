import { wrapper } from '../store';

const WrappedApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(WrappedApp);
