import type { ProductChoice } from "@prisma/client";
import type { FC } from "react";
import { useState, useEffect } from "react";
import type { MyObject } from "~/utils/types";
import DynamicFieldWrapper from "../Form/DynamicFieldWrapper";
import MyForm from "../Form/MyForm";
import ProductChoiceOptions from "./ProductChoiceOptions";

interface Props {
  errors?: MyObject<string | null>;
  choices?: ProductChoice[];
}

const ProductChoices: FC<Props> = ({ errors, choices }) => {
  const [count, setCount] = useState(choices?.length ?? 0);

  useEffect(() => {
    setCount(choices?.length ?? 0);
  }, [choices]);

  return (
    <>
      <input type="hidden" name="choices" value={count} />
      <DynamicFieldWrapper
        count={count}
        onAdd={() => setCount((prev) => prev + 1)}
        onRemove={() => setCount((prev) => (prev <= 0 ? prev : prev - 1))}
      >
        {new Array(count).fill(null).map((_, idx) => (
          <div
            key={idx}
            className="tw-p-4 tw-rounded-xl tw-border-gray-100 tw-bg-gray-50 tw-mb-2"
            style={{ border: "1px solid" }}
          >
            <h1 className=" tw-text-2xl tw-font-black tw-text-primary">
              {idx + 1}
            </h1>
            <div>
              <MyForm.Label>Required ?</MyForm.Label>
              {errors && errors[`required${idx}`] && (
                <p className="input-error">{errors[`required${idx}`]}</p>
              )}
              <div className="tw-flex tw-gap-4">
                <MyForm.Input
                  type={"radio"}
                  id={`required${idx}yes`}
                  label="Yes"
                  value={"on"}
                  name={`required${idx}`}
                  required
                  defaultChecked={choices ? choices[idx]?.required : false}
                  checked={choices ? choices[idx]?.required : false}
                />
                <MyForm.Input
                  type={"radio"}
                  id={`required${idx}no`}
                  label="No"
                  value={"off"}
                  name={`required${idx}`}
                  required
                  defaultChecked={choices ? !choices[idx]?.required : false}
                  checked={choices ? !choices[idx]?.required : false}
                />
              </div>
            </div>
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <MyForm.Input
                id={`selector${idx}`}
                label="Identifier"
                placeholder="eg. Lunch/Dinner Side Choice"
                name={`selector${idx}`}
                required
                errormessage={errors ? errors[`selector${idx}`] : undefined}
                defaultValue={choices ? choices[idx]?.selector : ""}
                value={choices ? choices[idx]?.selector : ""}
              />
              <MyForm.Input
                type={"number"}
                id={`requiredOptions${idx}`}
                label="Number of required options"
                name={`requiredOptions${idx}`}
                required
                errormessage={
                  errors ? errors[`requiredOptions${idx}`] : undefined
                }
                defaultValue={choices ? choices[idx]?.requiredOptions : ""}
                value={choices ? choices[idx]?.requiredOptions : ""}
              />
            </div>
            <div className="tw-mb-4">
              <MyForm.Label>Options</MyForm.Label>
              <ProductChoiceOptions
                name={`options${idx}`}
                errors={errors}
                options={choices ? choices[idx]?.options : []}
              />
            </div>
          </div>
        ))}
      </DynamicFieldWrapper>
    </>
  );
};

export default ProductChoices;
