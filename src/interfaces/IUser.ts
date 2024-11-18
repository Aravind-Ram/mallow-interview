export namespace IUser {
  // Define the User type
  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

  export interface Collection {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: {
      url: string;
      text: string;
    };
  }

  // Define the slice's state
  export interface UsersState {
    collection: Collection | null;
    users: User[] | null;
    selectedUser: User | null;
    openModal: boolean;
    loading: boolean;
    error: string | null;
  }

  export interface authUser {
    email: string;
    password: string;
  }

  export interface UserFormProps {
    user: User | null;
    handleAction: any;
  }

  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

  export interface CreateUser {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

  export interface Pagination {
    perPage?: number;
    current?: number;
    total?: number;
    page?: number;
    onPageSwitch: any;
  }
}
