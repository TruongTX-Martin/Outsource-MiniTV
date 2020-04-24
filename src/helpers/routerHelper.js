var currentRouter = 'Home';

export const setCurrentRouter = (routerInput) => {
  currentRouter = routerInput;
};

export const getCurrentRouter = () => currentRouter;
