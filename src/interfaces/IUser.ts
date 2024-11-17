export namespace IUser {

    export interface authUser {
        email: string,
        password: string
    }

    export interface UserCollection {
        page?: number,
        per_page?: number,
        total?: number,
        total_pages?: number,
        users?: User[], 
        data?: User[],
        support?: any
    }

    export interface UserFormProps {
        user: User | null,
        handleAction: any
    }

    export interface User {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        avatar: string
    }

    export interface CreateUser {
        first_name: string;
        last_name: string;
        email: string;
        avatar: string;
    }

    export interface Pagination {
        perPage?: number,
        current?: number,
        total?: number,
        page?: number,
        onPageSwitch: any
    }
}