import { timeToDate, timeRegex } from "@/utils/date";

export function handleArrayDelete<C>(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  index: number,
  dispatch: (action: any) => void
) {
  e.preventDefault();
  const { name } = e.currentTarget;
  dispatch({ type: name, payload: { mutator: "pop", index } });
}

export function handleArrayPush<C>(
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: (action: any) => void
) {
  e.preventDefault();
  const { name, value } = e.currentTarget;
  if (timeRegex.test(value)) {
    const isoValue = timeToDate(value).toISOString();
    dispatch({ type: name, payload: { mutator: "push", value: isoValue } });
  } else {
    dispatch({ type: name, payload: { mutator: "push", value } });
  }
}

export function handleArraySlice<C>(
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  dispatch: (action: any) => void
) {
  e.preventDefault();
  const { name, value } = e.currentTarget;
  if (timeRegex.test(value)) {
    const isoValue = timeToDate(value).toISOString();
    dispatch({
      type: name,
      payload: { mutator: "slice", value: isoValue, index },
    });
  } else {
    dispatch({
      type: name,
      payload: { mutator: "slice", value, index },
    });
  }
}

export function handleChange<C>(
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: (action: any) => void
) {
  const { name, value, checked, type } = e.target;

  if (type === "checkbox") {
    dispatch({ type: name, payload: checked });
  } else if (type === "number") {
    dispatch({ type: name, payload: Number(value) });
  } else if (type === "time") {
    if (timeRegex.test(value)) {
      const isoValue = timeToDate(value).toISOString();
      dispatch({ type: name, payload: isoValue });
    } else {
      console.error('Value must be in format "HH:MM"');
    }
  } else if (type === "text") {
    dispatch({ type: name, payload: value });
  }
}
