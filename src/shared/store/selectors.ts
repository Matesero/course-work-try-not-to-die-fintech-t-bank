export const isLoading = (store) =>
    store.user.isLoading ||
    store.inspection.isLoading ||
    store.dictionary.isLoading ||
    store.patient.isLoading;
