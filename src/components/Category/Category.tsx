"use client";

import { Fragment, useState } from "react";
import FormContainer from "@/components/FormContainer/FormContainer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Button from "@/components/Button/Button";
import Select from "../Select/Select";
import useReducerSWR from "@/hooks/useReducerSWR";
import { splitOnUpper, capitaliseAll, capitalise } from "@sean14/utils";
import { IDocument, TCategories } from "@/types/document";
import { getCategoryUrl, fetchCategory } from "@/utils/helpers";
import {
  handleArrayPush,
  handleArrayDelete,
  handleArraySlice,
  handleChange,
} from "@/utils/handlers/category";
import { dateToTime, isoToDate } from "@/utils/date";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const inputContainerClassName = "flex items-center gap-2 max-w-fit";

export default function Category<Server, Client>({
  id,
  category,
  fields,
  arrayFields,
  reducer,
  initialState,
}: {
  id?: string;
  category: keyof IDocument<TCategories>;
  fields?: { name: string; type: string }[];
  arrayFields?: { name: string; type: string }[];
  reducer: (state: Client, action: any) => Client;
  initialState: Client;
}) {
  const { state, error, dispatch, isLoading, isNew } = useReducerSWR<
    IDocument<Server>,
    Client
  >(
    reducer,
    initialState,
    category,
    getCategoryUrl(category, id),
    fetchCategory<Server>,
    "replaceAllData"
  );
  const [date, setDate] = useState<string>(new Date().toISOString());

  // TODO: Improve error component
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex w-full min-h-full items-start justify-center">
        <AiOutlineLoading3Quarters size={50} className="animate-spin" />
      </div>
    );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!state) return console.log("no state data");
    const headers = { "Content-Type": "application/json" };
    if (isNew) {
      fetch("/api/metrics", {
        method: "POST",
        headers,
        body: JSON.stringify({ [category]: state, date }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "replaceAllData", payload: initialState });
          setDate(new Date().toISOString());
          if (process.env.NODE_ENV === "development") {
            console.log(data);
          }
          if (data.error) {
            toast.error(data.error, {
              progressStyle: { backgroundColor: "#f56565" },
            });
          } else {
            toast.success("Successfully added new metric");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    } else {
      fetch(`/api/metrics/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ [category]: state }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (process.env.NODE_ENV === "development") {
            console.log(data);
          }
          if (data.error) {
            toast.error(data.error, {
              progressStyle: { backgroundColor: "#f56565" },
            });
          } else {
            toast.success("Successfully updated metric");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    }
  }

  function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  return (
    <FormContainer handleSubmit={handleSubmit} title={capitalise(category)}>
      {fields?.map(({ name, type }, index) => {
        if (type === "h1") {
          return (
            <Fragment key={index}>
              <hr className="mt-4 mb-0 border-slate-600 dark:border-slate-200" />
              <h3
                key={index}
                className="text-base xs:text-lg font-bold text-center"
              >
                {capitaliseAll(splitOnUpper(name))}
              </h3>
            </Fragment>
          );
        } else if (type === "h2") {
          return (
            <Fragment key={index}>
              <hr className="mt-4 mb-0 w-1/2 mx-auto border-slate-600 dark:border-slate-200" />
              <h4
                key={index}
                className="text-base xs:text-lg font-medium text-center"
              >
                {capitaliseAll(splitOnUpper(name))}
              </h4>
            </Fragment>
          );
        }

        let firstPart = name.split(".")[0];
        let secondPart = name.split(".")[1];
        let thirdPart = name.split(".")[2];

        // Get Value from State
        let value;
        if (firstPart && secondPart && thirdPart) {
          try {
            value =
              // @ts-ignore
              state[firstPart][secondPart][thirdPart] !== undefined
                ? // @ts-ignore
                  state[firstPart][secondPart][thirdPart]
                : undefined;
          } catch (e) {
            console.warn(e);
          }
        } else if (firstPart && secondPart) {
          try {
            value =
              // @ts-ignore
              state[firstPart][secondPart] !== undefined
                ? // @ts-ignore
                  state[firstPart][secondPart]
                : undefined;
          } catch (e) {
            console.warn(e);
          }
        } else {
          value = state[name as keyof Client];
        }

        // Generate Input Element
        let inputElement = <div>Error</div>;
        if (name === "sleepQuality") {
          inputElement = (
            <Select
              defaultValue=""
              title="select"
              options={["poor", "fair", "good", "excellent"]}
              onChange={(e) => {
                const value = e.target.value === "select" ? "" : e.target.value;
                dispatch({ type: "sleepQuality", payload: value });
              }}
              className="rounded p-1 border-2"
            />
          );
        } else if (typeof value === "number" || typeof value === "string") {
          inputElement = (
            <Input
              className="max-w-fit"
              type={type}
              name={name}
              value={
                type === "time" && typeof value === "string" && value !== ""
                  ? dateToTime(value)
                  : value
              }
              onChange={(e) => handleChange<Client>(e, dispatch)}
            />
          );
        } else if (typeof value === "boolean") {
          inputElement = (
            <div className="flex justify-start">
              <input
                id={name}
                type={"checkbox"}
                name={name}
                checked={value}
                onChange={(e) => handleChange<Client>(e, dispatch)}
                className="w-5 h-5"
              />
            </div>
          );
        }

        return (
          <div key={index} className={inputContainerClassName}>
            <Label
              name={name}
              label={capitaliseAll(
                splitOnUpper(thirdPart || secondPart || firstPart)
              )}
            />
            {inputElement}
          </div>
        );
      })}

      {arrayFields?.map(({ name, type }, index) => {
        type = type === "boolean" ? "checkbox" : type;
        return (
          <Fragment key={index}>
            <div className={inputContainerClassName}>
              <Label name={name} label={capitaliseAll(splitOnUpper(name))} />
              <Input
                className="max-w-fit"
                type={type}
                name={name}
                value={""}
                onChange={(e) => handleArrayPush<Server>(e, dispatch)}
              />
            </div>

            {Array.isArray(state[name as keyof Client]) &&
              // @ts-ignore
              state[name as keyof Server].map((value: any, index: number) => (
                <div key={index} className={inputContainerClassName || ""}>
                  <div className="w-32 xs:w-40 text-end">
                    <button
                      className="p-1 px-2 rounded bg-red-500/30 hover:bg-red-500/80 transition-colors"
                      name={name}
                      onClick={(e) => handleArrayDelete(e, index, dispatch)}
                    >
                      <FiDelete size={20} color={"white"} />
                    </button>
                  </div>
                  <Input
                    className="max-w-fit"
                    type={type}
                    name={name}
                    value={dateToTime(value) || ""}
                    onChange={(e) =>
                      handleArraySlice<Server>(e, index, dispatch)
                    }
                  />
                </div>
              ))}
          </Fragment>
        );
      })}

      {id === undefined && (
        <Input
          className="max-w-fit self-center mt-4"
          type="date"
          name="date"
          value={isoToDate(date)}
          onChange={handleDate}
          required
        />
      )}
      <Button margin={"mx-auto mt-2"}>{isNew ? "Create" : "Update"}</Button>
    </FormContainer>
  );
}
