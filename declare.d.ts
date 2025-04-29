declare global {
  namespace Vike {
    interface PageContext {
      isAuth: boolean,
      Page: () => React.JSX.Element
    }
  }
}

export {}