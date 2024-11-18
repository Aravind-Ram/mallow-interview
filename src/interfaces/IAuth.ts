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

  export interface AuthState {
    error: boolean;
    loading: boolean;
  }

  export interface Signin {
    email?: string;
    password?: string;
    remember?: string;
  }
}
