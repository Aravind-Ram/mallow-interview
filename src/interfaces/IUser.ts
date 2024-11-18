export namespace IUser {
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

  export interface UsersState {
    collection: Collection | null;
    users: User[] | null;
    selectedUser: User | null;
    openModal: boolean;
    loading: boolean;
    error: string | null;
  }

  export interface UserActionProps {
    user: User | null;
    handleAction: any;
  }

  export interface UserFormActionProps {
    user: User | null;
    handleAction: any;
  }

  export interface authUser {
    email: string;
    password: string;
  }

  export interface CreateUser {
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar?: string;
  }

  export interface Pagination {
    perPage?: number;
    current?: number;
    total?: number;
    page?: number;
    onPageSwitch: any;
  }
}
