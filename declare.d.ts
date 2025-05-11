declare global {
  namespace Vike {
    interface PageContext {
      isAuth: boolean,
      statusCode: number;
      Page: () => React.JSX.Element
    }
  }
}

export {}