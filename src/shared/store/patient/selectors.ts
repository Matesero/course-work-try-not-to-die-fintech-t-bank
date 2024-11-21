export const id = (store) => store.patient.id;
export const data = (store) => store.patient.data;
export const isDeath = (store) => store.patient.isDeath;

export const inspectionsWithoutChild = (store) =>
    store.patient.inspectionsWithoutChild;
