import apiClient from "@/lib/axios";
import { IPaginationAction } from "@/util/interfaces";


export class ApiService<T> {
    protected prefix: string = '';

    constructor(prefix: string) {
        this.prefix = prefix;
    }


    /** Fetch records with pagination & optional query */
    async fetchRecords({ page, query = '' }: { page: number; query?: string }): Promise<IPaginationAction<T>> {
        try {
            const { data } = await apiClient.get(query ? `${this.prefix}?page=${page}&${query}` : `${this.prefix}?page=${page}`);
            return data as IPaginationAction<T>;
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }

    /** Create a new record */
    async createRecord(payload: T): Promise<T | null> {
        if (typeof payload === 'object' && "id" in payload!) {
            delete payload.id;
        }
        return await apiClient.post(this.prefix, payload).then(({ data }) => data);
    }

    /** Create a new record */
    async customCreateRecord<CT>(endpoint: string, payload: CT): Promise<T | null> {
        if (typeof payload === 'object' && "id" in payload!) {
            delete payload.id;
        }
        return await apiClient.post(`${endpoint}`, payload).then(({ data }) => data);
    }

    /** Update an existing record */
    async updateRecord(id: string, payload: Partial<T>): Promise<T | null> {
        if (typeof payload === 'object' && "id" in payload!) {
            delete payload.id;
        }
        return await apiClient.patch(`${this.prefix}/${id}`, payload).then(({ data }) => data);
    }

    /** Update an existing record */
    async customUpdateRecord<CT>(endpoint: string, payload: Partial<CT>): Promise<CT | null> {
        if (typeof payload === 'object' && "id" in payload!) {
            delete payload.id;
        }
        return await apiClient.patch(`${endpoint}`, payload).then(({ data }) => data);
    }

    /** Delete a record */
    async deleteRecord(id: string): Promise<string> {
        try {
            await apiClient.delete(`${this.prefix}/${id}`);
            return id;
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }

    /** Delete a record */
    async customDeleteRecord(endpoint: string, id: string): Promise<string> {
        try {
            await apiClient.delete(`${endpoint}/${id}`);
            return id;
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }

    /** GET a record */
    async getRecord(id: string): Promise<string> {
        try {
            const { data } = await apiClient.get(`${this.prefix}/${id}`);

            return data;
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }

    async customFetchRecords(endpoint: string): Promise<IPaginationAction<T>> {
        try {
            const { data } = await apiClient.get(`${endpoint}`);
            return data as IPaginationAction<T>;
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    }
}
