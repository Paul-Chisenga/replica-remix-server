import type { SelectedChoiceOption } from "@prisma/client";
import { ProductChoice } from "@prisma/client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { HandledOptions, InitProps } from "~/utils/types";
import ProductChoiceOption from "./ProductChoiceOption";

interface Props extends InitProps {
  choice: ProductChoice;
  selectedOptions?: SelectedChoiceOption[];
  onChange: (selected: HandledOptions) => void;
}

function parseHandledOptions(
  options: SelectedChoiceOption[] | undefined
): HandledOptions {
  if (!options) {
    return {};
  }
  const optionsMap: HandledOptions = {};
  options.forEach((opt) => {
    optionsMap[+opt.id] = { count: opt.count };
  });
  return optionsMap;
}

const ProductChoice: FC<Props> = ({ choice, onChange, selectedOptions }) => {
  const [handledptions, setHandledOptions] = useState<HandledOptions>(
    parseHandledOptions(selectedOptions)
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    const totalCount = Object.values(handledptions).reduce(
      (prev, cur) => prev + cur.count,
      0
    );
    setCount(totalCount);
    onChange(handledptions);
  }, [handledptions]);

  return (
    <div className="tw-space-y-0">
      <div className="border-bottom">
        <div className="tw-flex tw-gap-4 tw-items-center ">
          <div className="tw-font-bold tw-text-dark tw-text-lg tw-font-jost">
            {choice.selector}
          </div>
          {choice.required && (
            <div className="tw-leading-none tw-rounded-full tw-bg-orange-500 tw-text-base tw-font-cormorant tw-font-black tw-text-white tw-shrink-0 tw-px-2 tw-pb-1">
              required
            </div>
          )}
        </div>

        <div className="tw-text-sm">Choose: x{choice.requiredOptions}</div>
      </div>
      <div className="tw-py-4 tw-space-y-2">
        {choice.options.map((opt, index) => (
          <ProductChoiceOption
            key={index}
            option={{
              id: index,
              label: opt,
            }}
            selected={(function () {
              const selectedOption = selectedOptions?.find(
                (slOpt) => slOpt.id === "" + index
              );
              if (selectedOption) {
                return { count: selectedOption.count };
              }
              return undefined;
            })()}
            selectionFull={count === choice.requiredOptions}
            noOfRequiredOptions={choice.requiredOptions}
            onDecrement={(selected) => {
              const cpy = { ...handledptions };
              const option = cpy[selected.id];
              if (option && option.count > 0) {
                option.count = option.count - 1;
              }
              setHandledOptions(cpy);
            }}
            onIncrement={(selected) => {
              const cpy = { ...handledptions };
              const option = cpy[selected.id];
              if (count < choice.requiredOptions) {
                if (option) {
                  option.count = option.count + 1;
                } else {
                  cpy[selected.id] = { count: 1 };
                }
              }
              setHandledOptions(cpy);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductChoice;
