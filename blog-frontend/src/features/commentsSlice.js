import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments(state, action) {
            state.comments = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setComments, setLoading, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
