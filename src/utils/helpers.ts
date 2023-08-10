export function newReducerState<C>(state: C, field: keyof C, value: any) {
  return {
    ...state,
    [field]: value,
  };
}

export function newNestedReducerState<C, NC>(
  state: C,
  action: any,
  field: keyof C,
  nestedField: keyof NC
) {
  return {
    ...state,
    [field]: {
      ...state[field],
      [nestedField]: action.payload,
    },
  };
}
