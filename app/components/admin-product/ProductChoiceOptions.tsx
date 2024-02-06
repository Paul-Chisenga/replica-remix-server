import { FC, memo } from "react";
import { useState } from "react";
import type { InitProps } from "~/utils/types";
import DynamicFieldWrapper from "../Form/DynamicFieldWrapper";
import MyForm from "../Form/MyForm";

interface Props extends InitProps {
  name: string;
  errors?: any;
  options?: string[];
}

const ProductChoiceOptions: FC<Props> = ({ name, errors, options }) => {
  const [count, setCount] = useState(options?.length ?? 0);

  return (
    <div>
      {errors && errors[name] && <p className="input-error">{errors[name]}</p>}

      <DynamicFieldWrapper
        count={count}
        onAdd={() => setCount((prev) => prev + 1)}
        onRemove={() => setCount((prev) => (prev <= 0 ? prev : prev - 1))}
        className="tw-flex-row-reverse"
      >
        {new Array(count).fill(null).map((_, index) => (
          <MyForm.Input
            key={index}
            id={"" + index}
            name={name}
            required
            defaultValue={options ? options[index] : ""}
            // value={options ? options[index] : ""}
          />
        ))}
      </DynamicFieldWrapper>
    </div>
  );
};

export default memo(ProductChoiceOptions);
