import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerDispatch, getData, howAmI, loginDipatch } from "./actions";
import { checkToken, deleteFromLocal, setInLocal } from "@/util/util";
import { IGetAction, ITokenDecode, IUser } from "@/util/interfaces";


export interface ILoginResponse {
    access_token: string;
}

interface AuthState {
    isAuthenticated: boolean;
    actions: {
        loading: boolean;
        success: boolean;
        errors: string[]
    };
    token: string | null;
    user: null | ITokenDecode | IUser
    authLoading: boolean

}

const initialState: AuthState = {
    isAuthenticated: false,
    actions: { errors: [], loading: false, success: false },
    token: null,
    user: null,
    authLoading: true,
}

const authSlice = createSlice({
    initialState,
    name: "AUTH_SLICE",
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null
            state.user = null
            deleteFromLocal("jwt_access_token");
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            state.authLoading = false;
        },
        setUser: (state, action: PayloadAction<ITokenDecode>) => {
            state.user = action.payload;
            state.authLoading = false
        },
        resetErrors: (state) => {
            state.actions = { loading: false, errors: [], success: false };
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getData.pending, (state) => {
                state.actions = { loading: true, errors: [], success: false };
                state.authLoading = true
            })
            .addCase(getData.fulfilled, (state, action: PayloadAction<IGetAction<IUser>>) => {
                const { payload } = action
                state.actions = { loading: false, errors: [], success: true };
                state.isAuthenticated = true;
                state.authLoading = false
                state.user = payload.data
            })
            .addCase(getData.rejected, (state, { payload }: any) => {
                console.log({ payload });

                state.actions = { loading: false, errors: payload ? [payload] : ["Invalid login"], success: false };
                state.authLoading = false
                state.isAuthenticated = false
                state.user = null
                deleteFromLocal("token")
            }
            )

        builder
            .addCase(registerDispatch.pending, (state) => {
                state.actions = { loading: true, errors: [], success: false };
            })
            .addCase(registerDispatch.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                const { payload } = action
                console.log(payload);
                state.actions = { loading: false, errors: [], success: true };

            })
            .addCase(registerDispatch.rejected, (state, { payload }: any) => {
                console.log({ payload });
                state.actions = { loading: false, errors: Array.isArray(payload?.message) ? payload.message : [payload.message || "An unknown error occurred"], success: false };


            }
            )
        builder
            .addCase(loginDipatch.pending, (state) => {
                state.actions = { loading: true, errors: [], success: false };
            })
            .addCase(loginDipatch.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                const { payload } = action
                state.actions = { loading: false, errors: [], success: true };
                state.token = payload.access_token;
                state.isAuthenticated = true;
                state.authLoading = false
                state.user = checkToken(payload.access_token)
                setInLocal("jwt_access_token", payload.access_token);
            })
            .addCase(loginDipatch.rejected, (state, { payload }: any) => {
                console.log({ payload });

                state.actions = { loading: false, errors: payload[0]?.message ? [payload[0].message] : ["Invalid login"], success: false };
            }
            )

        builder
            .addCase(howAmI.pending, (state) => {
                state.actions = { loading: true, errors: [], success: false };
                state.authLoading = true;
            })
            .addCase(howAmI.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
                // console.log(payload);
                state.actions = { loading: false, errors: [], success: true };
                state.user = payload;
                state.isAuthenticated = true;
                state.authLoading = false;
            })
            .addCase(howAmI.rejected, (state) => {
                state.actions = { loading: false, errors: [], success: false };
                state.isAuthenticated = false;
                state.authLoading = false;
            }
            )
    },
})

export const { logout, setUser, setAuth, resetErrors } = authSlice.actions;
export default authSlice.reducer;
