
import { ITodo } from "@/util/interfaces";
import { ApiSlice } from "@/helpers/ApiSlice";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


export const prefix = "/todos";

class TodoSlice extends ApiSlice<ITodo> {

    constructor() {
        super("todos", prefix);
    }

    /** Custom Actions */
    generateRandomTasks = createAsyncThunk(`${this.name}/generateRandomTasks`, async (_, { rejectWithValue }) => {
        return await this.apiService.customFetchRecords(`todos/generate-random-tasks`)
            .catch(({ response }) => rejectWithValue(response?.data || "An unknown error occurred."))
    })



    /** Custom Reducers */
    protected customReducers(builder: any): void {
        builder
            .addCase(this.generateRandomTasks.pending, (state: any) => {
                state.list = { loading: true, error: "", success: false };
            })
            .addCase(this.generateRandomTasks.fulfilled, (state: any, { payload }: PayloadAction<any>) => {
                console.log({ payload });
                state.list = { loading: false, error: "", success: true };
                state.data = payload.result
                state.pagination = {
                    total: payload.limit, page: payload.page, totalCount: payload.totalCount, totalPages: payload.totalPages
                }
            })
            .addCase(this.generateRandomTasks.rejected, (state: any, { payload }: PayloadAction<any>) => {
                console.log({ payload });
                state.list = { loading: false, error: payload as string, success: false };
            })
    }

}


const slice = new TodoSlice();

export const { createRecord, deleteRecord, fetchRecords, updateRecord, generateRandomTasks } = slice;

const todoSlice = slice.generateSlice();

export const { resetState } = todoSlice.actions;

export default todoSlice.reducer
