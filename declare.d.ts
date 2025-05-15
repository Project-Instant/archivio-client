declare global {
  namespace Vike {
    interface PageContext {
      isAuth: boolean,
      statusCode: number;
      snapshot: Rec<PersistRecord<unknown>>,
      Page: () => React.JSX.Element
    }
  }
}

export {}