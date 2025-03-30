import { createSlice, PayloadAction, createAsyncThunk, SliceCaseReducers } from "@reduxjs/toolkit";
import { ApiService } from "./APIService";

export class ApiSlice<T> {
    protected name: string = '';
    protected apiService: ApiService<T>;
    protected initialState:
        {
            record: T | null
            data: T[],
            pagination: { page: number, total: number, totalCount: number, totalPages: number },
            list: { loading: boolean, error: string | null, success: boolean },
            actions: { loading: boolean, error: string[] | null, success: boolean },
            customActions?: { loading: boolean, error: string[] | null, success: boolean }
        };

    constructor(name: string, prefix: string) {
        this.name = name;
        this.apiService = new ApiService<T>(prefix);
        this.initialState = {
            record: null,
            data: [],
            pagination: { page: 0, total: 0, totalCount: 0, totalPages: 0 },
            list: { loading: false, error: null, success: false },
            actions: { loading: false, error: null, success: false },
            customActions: { loading: false, error: null, success: false }
        };
    }

    /** Fetch Records */
    fetchRecords = createAsyncThunk<any, { page: number; query?: string }, { rejectValue: string }>(`${this.name}/fetch`,
        async ({ page, query = '' }, { rejectWithValue }) =>
            await this.apiService
                .fetchRecords({ page, query })
                .catch(({ response }) => rejectWithValue(response?.data || "An unknown error occurred."))
    );

    /** Fetch Record By ID */
    getRecord = createAsyncThunk<any, { id: string }, { rejectValue: string }>(`${this.name}/get`,
        async ({ id }, { rejectWithValue }) =>
            await this.apiService
                .getRecord(id)
                .catch(({ response }) => rejectWithValue(response?.data || "An unknown error occurred."))
    );

    /** Create Record */
    createRecord = createAsyncThunk<T | null, T, { rejectValue: string[] }>(`${this.name}/create`,
        async (payload: T, { rejectWithValue }) =>
            await this.apiService
                .createRecord(payload)
                .catch(({ response }) => rejectWithValue(response?.data?.message?.[0].message || ["An unknown error occurred."]))
    )

    /** Update Record */
    updateRecord = createAsyncThunk(`${this.name}/update`,
        async ({ id, payload }: { id: string; payload: Partial<T> }, { rejectWithValue }) =>
            await this.apiService
                .updateRecord(id, payload)
                .catch(({ response }) => rejectWithValue(response?.data?.message?.[0].message || ["An unknown error occurred."]))
    );

    /** Delete Record */
    deleteRecord = createAsyncThunk(`${this.name}/delete`,
        async (id: string, { rejectWithValue }) =>
            await this.apiService
                .deleteRecord(id)
                .catch(({ response }) => rejectWithValue(response?.data || "An unknown error occurred."))

    );


    protected customReducers(_builder: any): void {

    }

    protected customActions(): SliceCaseReducers<any> {
        return {};
    }

    /** Create the Redux Slice */
    generateSlice() {
        return createSlice({
            name: this.name,
            initialState: this.initialState,
            reducers: {
                resetState: (state) => {
                    state.data = [];
                    state.list = { loading: false, error: "", success: false };
                    state.actions = { loading: false, error: null, success: false };
                },
                ...this.customActions(),
            },
            extraReducers: (builder) => {
                builder
                    // Fetch Records
                    .addCase(this.fetchRecords.pending, (state) => {
                        state.list = { loading: true, error: "", success: false };
                    })
                    .addCase(this.fetchRecords.fulfilled, (state, { payload }: PayloadAction<any>) => {
                        console.log({ payload });

                        state.list = { loading: false, error: "", success: true };
                        state.data = payload.result
                        state.pagination = {
                            total: payload.limit, page: payload.page, totalCount: payload.totalCount, totalPages: payload.totalPages
                        }
                    })
                    .addCase(this.fetchRecords.rejected, (state, { payload }) => {
                        console.log({ payload });
                        state.list = { loading: false, error: payload as string, success: false };
                    })

                builder
                    // Fetch Records
                    .addCase(this.getRecord.pending, (state) => {
                        state.list = { loading: true, error: "", success: false };
                    })
                    .addCase(this.getRecord.fulfilled, (state, { payload }: PayloadAction<any>) => {
                        // console.log({ payload });

                        state.list = { loading: false, error: "", success: true };
                        state.record = payload
                    })
                    .addCase(this.getRecord.rejected, (state, { payload }) => {
                        console.log({ payload });
                        state.list = { loading: false, error: payload as string, success: false };
                    })

                    // Create Record
                    .addCase(this.createRecord.pending, (state) => {
                        state.actions = { loading: true, error: null, success: false };
                    })
                    .addCase(this.createRecord.fulfilled, (state, { payload }: PayloadAction<any>) => {
                        console.log({ payload });

                        state.actions = { loading: false, error: null, success: true };
                        if (payload) state.data.push(payload);
                    })
                    .addCase(this.createRecord.rejected, (state, { payload }) => {
                        console.log({ payload });

                        state.actions = { loading: false, error: Array.isArray(payload) ? payload : [payload || "An unknown error occurred"], success: false };
                    })

                    // Update Record
                    .addCase(this.updateRecord.pending, (state) => {
                        state.actions = { loading: true, error: null, success: false };
                        // state.error = null;
                    })
                    .addCase(this.updateRecord.fulfilled, (state, { payload }: PayloadAction<any | null>) => {
                        console.log({ payload });

                        state.actions = { loading: false, error: null, success: true };
                        state.data = state.data.map((item: any) => (item._id === payload?._id ? payload : item));

                    })
                    .addCase(this.updateRecord.rejected, (state, { payload }) => {
                        console.log(payload);

                        state.actions = { loading: false, error: Array.isArray(payload) ? payload : [payload || "An unknown error occurred"], success: false };
                    })

                    // Delete Record
                    .addCase(this.deleteRecord.pending, (state) => {
                        state.actions = { loading: true, error: null, success: false };
                        // state.error = null;
                    })
                    .addCase(this.deleteRecord.fulfilled, (state, { payload }: PayloadAction<any>) => {
                        state.actions = { loading: false, error: null, success: true };
                        state.data = state.data.filter((item: any) => item._id !== payload);
                    })
                    .addCase(this.deleteRecord.rejected, (state, { payload }) => {
                        state.actions = { loading: false, error: payload as string[], success: false };
                    });
                this.customReducers(builder);
            },
        });
    }
}
