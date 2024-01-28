import { ElectricGadget } from "../../../Redux/features/electricGadgets/electricGadgetsAPI";
import { ElectricGadgetsListProps } from "./Management/ElectricGadgetsList";

export function applyFilters(
  gadgets: ElectricGadget[],
  filters?: ElectricGadgetsListProps["filters"]
): ElectricGadget[] {
  let filteredGadgets = [...gadgets];

  if (filters) {
    // Filter by category
    if (filters.category) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.category === filters.category
      );
    }

    // Filter by brand
    if (filters.brand) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.brand === filters.brand
      );
    }

    // Additional filters
    if (filters.operatingSystem) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.operatingSystem === filters.operatingSystem
      );
    }

    if (filters.connectivity) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.connectivity === filters.connectivity
      );
    }

    if (filters.modelNumber) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.modelNumber === filters.modelNumber
      );
    }

    if (filters.powerSource) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.powerSource === filters.powerSource
      );
    }
    // Handle weight filter

    if (filters.weight) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.powerSource === filters.weight
      );
    }

    // Filter by releaseDate
    if (filters.releaseDate) {
      filteredGadgets = filteredGadgets.filter(
        (gadget) => gadget.releaseDate === filters.releaseDate
      );
    }
  }

  return filteredGadgets;
}
