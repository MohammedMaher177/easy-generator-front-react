import authClient from "@/lib/axios";
import { ILogin, IUser, IGetAction, IRegister } from "@/util/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginResponse } from "./slice";


export const loginDipatch = createAsyncThunk<ILoginResponse, ILogin>(
    "Auth/signin",
    async (values: ILogin, { rejectWithValue }) => {
        return await authClient
            .post("/auth/login", values)
            .then(({ data }: any) => data as ILoginResponse)
            .catch(({ response }: any) => rejectWithValue(response?.data?.message));
    }
);

export const registerDispatch = createAsyncThunk<ILoginResponse, IRegister>("auth/create",
    async (data: IRegister, { rejectWithValue }) => {
        return await authClient
            .post(`/auth/register`, data)
            .then(({ data }: any) => data as ILoginResponse)
            .catch(({ response }: any) => rejectWithValue(response.data));
    }
);

export const getData = createAsyncThunk<IGetAction<IUser>, { id: string }>(
    "Auth/get-data",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        return await authClient
            .get(`/auth/users/${id}`)
            .then(({ data }: any) => data as IGetAction<IUser>)
            .catch(({ response }: any) => rejectWithValue(response?.data?.message));
    }
);

export const howAmI = createAsyncThunk<IUser>(
    "Auth/describe-me",
    async (_, { rejectWithValue }) => {
        return await authClient
            .get(`/users/describe-me`)
            .then(({ data }: any) => data as IUser)
            .catch(({ response }: any) => rejectWithValue(response?.data?.message));
    }
);
