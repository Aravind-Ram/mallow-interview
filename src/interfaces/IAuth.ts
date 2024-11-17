export namespace IAuth {
  export interface AuthContextType {
    user: {
      email: string;
      password: string;
    };
    loading: boolean;
    signin: (user: any, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
  }
}
