export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister extends ILogin {
    name: string
}

export interface ITokenDecode {
    sub: string;
    name: string;
    email: string;
}

export type IUpdateAction<T> = {
    id: string;
    data: Partial<T>;
};

export type IGetAction<T> = {
    data: T;
};

export type IActionResponse<T> = {
    id: string;
    data: T;
};

export type IListAction<T> = {
    id: string;
    data: T[];
};

export type IPaginationAction<T> = {
    id: string;
    data: {
        limit: number;
        page: number;
        total: number;
        data: T[];
    };
};

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    isActive?: boolean;
}

export type InputType = 'text' | 'number' | 'email' | 'password' | 'date' | 'select';

export enum ETodoPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface ITodo {
    _id?: string;
    title: string;
    description?: string;
    completed: boolean;
    user?: string;
    dueDate?: Date;
    priority: ETodoPriority;
    category?: string;
    tags: string[];
    isActive: boolean;
}

export interface CategoryReportItem {
    category: string;
    count: number;
}

export interface PriorityReportItem {
    priority: ETodoPriority
    count: number;
}

export interface TodoReport {
    byCategory: CategoryReportItem[];
    byPriority: PriorityReportItem[];
}
