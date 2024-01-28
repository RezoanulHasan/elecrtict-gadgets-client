import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ElectricGadget,
  useUpdateElectricGadgetMutation,
} from "./electricGadgetsAPI";

// Define the state structure
interface ElectricGadgetsState {
  electricGadgets: ElectricGadget[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

// Initial state
const initialState: ElectricGadgetsState = {
  electricGadgets: [],
  status: "idle",
  error: null,
  message: null,
};

export const updateElectricGadget = createAsyncThunk(
  "electricGadgets/updateElectricGadget",
  async (params: { id: string; updatedData: Partial<ElectricGadget> }) => {
    const [mutate] = useUpdateElectricGadgetMutation();

    try {
      // Call the mutate function with the parameters
      const result = await mutate(params);

      // Check for the presence of 'data' in the result
      if ("data" in result) {
        // Extract the data from the mutation state
        return result.data;
      }

      // If there is an error, you can handle it here
      throw new Error("Mutation error");
    } catch (error) {
      // Handle the error, log, throw, or return a default value
      console.error("Error updating gadget:", error);
      throw error;
    }
  }
);

// Create the slice
const electricGadgetsSlice = createSlice({
  name: "electricGadgets",
  initialState,
  reducers: {
    // Action to start fetching electric gadgets
    getElectricGadgetsStart(state) {
      state.status = "loading";
      state.error = null;
    },
    // Action for successful fetching of electric gadgets
    getElectricGadgetsSuccess(state, action: PayloadAction<ElectricGadget[]>) {
      state.status = "succeeded";
      state.electricGadgets = action.payload;
    },
    // Action for failed fetching of electric gadgets
    getElectricGadgetsFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    // Action to start adding an electric gadget
    addElectricGadgetStart(state) {
      state.status = "loading";
      state.error = null;
    },
    // Action for successful addition of an electric gadget
    addElectricGadgetSuccess(state, action: PayloadAction<ElectricGadget>) {
      state.status = "succeeded";
      state.electricGadgets.push(action.payload);
    },
    // Action for failed addition of an electric gadget
    addElectricGadgetFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    // Action to start updating an electric gadget
    updateElectricGadgetStart(state) {
      state.status = "loading";
      state.error = null;
    },
    // Action for successful update of an electric gadget
    updateElectricGadgetSuccess(state, action: PayloadAction<ElectricGadget>) {
      state.status = "succeeded";
      const updatedGadget = action.payload;
      const index = state.electricGadgets.findIndex(
        (gadget) => gadget?.id === updatedGadget.id
      );
      if (index !== -1) {
        state.electricGadgets[index] = updatedGadget;
      }
    },
    // Action for failed update of an electric gadget
    updateElectricGadgetFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteElectricGadgetStart(state) {
      state.status = "loading";
      state.error = null;
    },
    deleteElectricGadgetSuccess(state, action: PayloadAction<string>) {
      state.status = "succeeded";
      state.electricGadgets = state.electricGadgets?.filter(
        (gadget) => gadget?.id !== action.payload
      );
    },
    deleteElectricGadgetFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    bulkDeleteElectricGadgetsStart(state) {
      state.status = "loading";
      state.error = null;
    },
    bulkDeleteElectricGadgetsSuccess(state, action: PayloadAction<string[]>) {
      state.status = "succeeded";
      state.electricGadgets = state.electricGadgets?.filter(
        (gadget) => !action.payload.includes(gadget?.id)
      );
    },
    bulkDeleteElectricGadgetsFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    updateGadgetQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const index = state.electricGadgets.findIndex(
        (gadget) => gadget?.id === id
      );
      if (index !== -1) {
        state.electricGadgets[index] = {
          ...state.electricGadgets[index],
          quantity: quantity,
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Handle the updateElectricGadget async thunk
    builder.addCase(updateElectricGadget.fulfilled, (state, action) => {
      electricGadgetsSlice.caseReducers.updateElectricGadgetSuccess(
        state,
        action as PayloadAction<ElectricGadget>
      );
    });
    builder.addCase(updateElectricGadget.rejected, (state, action) => {
      electricGadgetsSlice.caseReducers.updateElectricGadgetFailure(
        state,
        action as PayloadAction<string>
      );
    });
  },
});

export const {
  getElectricGadgetsStart,
  getElectricGadgetsSuccess,
  getElectricGadgetsFailure,
  addElectricGadgetStart,
  addElectricGadgetSuccess,
  addElectricGadgetFailure,
  updateElectricGadgetStart,
  updateElectricGadgetSuccess,
  updateElectricGadgetFailure,
  deleteElectricGadgetStart,
  deleteElectricGadgetSuccess,
  deleteElectricGadgetFailure,
  bulkDeleteElectricGadgetsStart,
  bulkDeleteElectricGadgetsSuccess,
  bulkDeleteElectricGadgetsFailure,
  updateGadgetQuantity,
} = electricGadgetsSlice.actions;

export default electricGadgetsSlice.reducer;
