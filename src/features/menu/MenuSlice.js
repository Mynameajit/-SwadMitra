import { createSlice } from "@reduxjs/toolkit";
import { fetchMenus } from "./MenuService";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
    page: 1,
    limit: 12, 
    totalPage: 1,

    loading: false,
    error: null,

    hasMore: true,
    isFetchingMore: false,
  },

  reducers: {
    resetMenus: (state) => {
      state.menus = [];
      state.page = 1;
      state.totalPage = 1;
      state.hasMore = true;

      state.loading = false;
      state.isFetchingMore = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state, action) => {
        const incomingPage = action.meta.arg.page;

        if (incomingPage === 1) {
          state.loading = true;
        } else {
          state.isFetchingMore = true;
        }
      })

      .addCase(fetchMenus.fulfilled, (state, action) => {
        const incomingPage = action.meta.arg.page;
        const { totalPage, items } = action.payload;

        // ✅ update totalPage
        state.totalPage = totalPage;

        if (incomingPage === 1) {
          state.menus = items;
        } else {
          // ✅ duplicates prevent
          const existingIds = new Set(state.menus.map((m) => m._id));
          const newMenus = items.filter((m) => !existingIds.has(m._id));
          state.menus = [...state.menus, ...newMenus];
        }

        state.page = incomingPage;

        // ✅ correct hasMore
        state.hasMore = incomingPage < totalPage;

        state.loading = false;
        state.isFetchingMore = false;
      })

      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.isFetchingMore = false;

        state.error =
          action.payload?.message || action.payload || "Failed to load menus";
      });
  },
});

export const { resetMenus } = menuSlice.actions;
export default menuSlice.reducer;
