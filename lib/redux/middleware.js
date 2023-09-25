/* Core */
import { createLogger } from 'redux-logger';

const middleware = [
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      error: () => '#ff0005',
      title: () => '#139BFE',
      action: () => '#149945',
      nextState: () => '#A47104',
      prevState: () => '#1C5FAF'
    },
    predicate: () => typeof window !== 'undefined'
  })
];

export { middleware };
