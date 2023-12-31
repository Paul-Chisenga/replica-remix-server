import type {
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import { forwardRef, useState, useRef } from "react";

interface SharedProps {
  label?: ReactNode;
  errormessage?: string | null;
}

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    SharedProps {
  horizontal?: boolean;
}

interface TextAreaProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    SharedProps {}

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  required?: boolean;
}

interface MiscProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  required?: boolean;
}

interface SelectProps
  extends React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    SharedProps {}

interface OptionProps
  extends React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {}

interface GroupProps
  extends React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  > {
  select?: string;
  required?: boolean;
}

const Elements = ["Input", "TextArea", "Select", "File", "MISC"];

type FormObj = {
  Misc: FC<MiscProps>;
  Label: FC<LabelProps>;
  Input: ForwardRefExoticComponent<
    Omit<InputProps, "ref"> & RefAttributes<HTMLInputElement>
  >;
  TextArea: ForwardRefExoticComponent<
    Omit<TextAreaProps, "ref"> & RefAttributes<HTMLTextAreaElement>
  >;
  Select: {
    Wrapper: ForwardRefExoticComponent<
      Omit<SelectProps, "ref"> & RefAttributes<HTMLSelectElement>
    >;
    Option: FC<OptionProps>;
  };
  File: ForwardRefExoticComponent<
    Omit<InputProps, "ref"> & RefAttributes<HTMLInputElement>
  >;
  Group: FC<GroupProps>;
};

const MyForm: FormObj = {
  Misc(props) {
    return <div {...props} />;
  },
  Label(props) {
    return (
      <label {...props} className={`form-input-label ${props.className}`} />
    );
  },
  Input: forwardRef((props, ref) => {
    const inputProps = { ...props };
    if (inputProps.horizontal) {
      delete inputProps.horizontal;
    }
    if (props.type === "radio" || props.type === "checkbox") {
      return (
        <div className="form-check">
          <input {...inputProps} className="form-check-input" ref={ref} />
          <label className="form-check-label" htmlFor={props.id}>
            {props.label}
          </label>
        </div>
      );
    }
    return (
      <div className="tw-mb-6 form-input">
        {props.label && (
          <label htmlFor={props.id} className="required">
            {props.label}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className={`light ${props.className}`}
        />
        {props.errormessage && <p>{props.errormessage}</p>}
      </div>
    );
  }),
  TextArea: forwardRef((props, ref) => {
    return (
      <div className="tw-mb-6 form-input">
        {props.label && (
          <label htmlFor={props.id} className="required">
            {props.label}
          </label>
        )}
        <textarea {...props} ref={ref} className={`light ${props.className}`} />
        {props.errormessage && <p>{props.errormessage}</p>}
      </div>
    );
  }),
  Select: {
    Wrapper: forwardRef((props, ref) => {
      let children = props.children;

      // There is only one element
      if (Array.from(children as any).length === 0) {
        if (
          typeof (children as any).type !== "function" ||
          (children as any).type.name !== "Option"
        ) {
          children = null;
        }
      } else {
        children = (children as any).filter(
          (element: { type: { name: string } }) => {
            const isOptionElmt = (el: { type: any }) => {
              return typeof el.type === "function" && el.type.name === "Option";
            };
            if (isOptionElmt(element)) {
              return true;
            }
            // Getting options dynamicaly
            else if (
              Array.isArray(element) &&
              element.find((elmt) => isOptionElmt(elmt))
            ) {
              return true;
            }
            return false;
          }
        );
      }
      return (
        <div className="tw-mb-6 form-input">
          {props.label && (
            <label htmlFor={props.id} className="required">
              {props.label}
            </label>
          )}
          <select
            {...props}
            ref={ref}
            className={`light tw-appearance-none ${props.className}`}
          />
          {props.errormessage && <p>{props.errormessage}</p>}
        </div>
      );
    }),
    Option(props) {
      return <option {...props} className="select-option" />;
    },
  },
  File: forwardRef((props, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
      fileRef.current?.click();
    };

    const handleChange = () => {
      if (fileRef.current && fileRef.current.files) {
        const fileList = fileRef.current.files;
        const fileListArray = Array.from(fileList);
        setFiles(fileListArray);
      }
    };

    return (
      <div className="tw-flex tw-flex-col-reverse tw-p-4 tw-bg-gray-100 tw-border tw-border-dashed tw-rounded-lg tw-border-primary-500 ">
        {props.errormessage && (
          <div className="tw-px-2 tw-text-xs tw-text-red-500 ">
            {props.errormessage}
          </div>
        )}
        <input
          type={"file"}
          ref={fileRef}
          {...props}
          className={`tw-hidden`}
          onChange={handleChange}
        />
        {/* custom input Control */}
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden ">
          <button
            type="button"
            className="btn-fill-primary tw-min-w-[30%] tw-block tw-rounded-none"
            onClick={handleClick}
          >
            Select
          </button>
        </div>
        {/* File previews */}
        <div className="tw-flex tw-flex-wrap tw-p-4">
          {files.map((item, idx) => {
            let url = URL.createObjectURL(item);
            let assetLogo = "";
            const size = (item.size * 0.001).toFixed(0);

            return (
              <div
                key={idx}
                className="tw-flex tw-flex-col tw-mb-2 tw-mr-2 tw-items-center tw-justify-center tw-p-4 tw-w-full tw-max-w-[200px] tw-text-center tw-bg-gray-100 tw-rounded-lg"
              >
                {url && (
                  <img
                    src={url}
                    alt=""
                    className="tw-block tw-object-cover tw-w-full tw-mb-2 tw-max-h-[250px]"
                  />
                )}
                {!url && (
                  <>
                    <img
                      src={assetLogo}
                      alt=""
                      className="tw-inline-block tw-object-contain tw-h-12 tw-mb-4"
                    />
                    <h5 className="tw-text-xs tw-font-bold tw-text-black tw-break-words tw-break-all md:tw-text-sm">
                      {item.name}
                    </h5>
                    <h6 className="tw-text-xs tw-font-bold tw-break-words tw-break-all md:tw-text-sm">
                      {size} kb
                    </h6>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <label htmlFor={props.id} className={"form-input-label required"}>
          {props.label}
        </label>
      </div>
    );
  }),
  Group(props) {
    let children = props.children as any;
    // There is only one element
    if (Array.from(children).length === 0) {
      if (
        (typeof children === "function" &&
          !Elements.includes(children.type.name)) ||
        (typeof children.type === "object" &&
          !Elements.includes(children.type.displayName))
      ) {
        children = null;
      }
    } else {
      children = children.filter(
        (element: { type: { name: string; displayName: string } }) => {
          if (!element) {
            return null;
          }

          if (!element.type) {
            // Element might be an array of elemnts
            if (typeof element === "object") return true;
            return false;
          }
          return (
            Elements.includes(element.type.name) ||
            Elements.includes(element.type.displayName) ||
            element.type.name === "Label" ||
            element.type.name === "Misc"
          );
        }
      );
    }
    return (
      <fieldset
        {...props}
        className={`
        ${
          props.select &&
          props.required &&
          "[&>label]after:content-['*'] [&>label]:after:text-red-500 [&>label]:after:inline-block [&>label]:after:ml-1 "
        } 
        ${props.className}`}
      />
    );
  },
};

MyForm.Input.displayName = "Input";
MyForm.TextArea.displayName = "TextArea";
MyForm.Select.Wrapper.displayName = "Select";
MyForm.File.displayName = "File";

export default MyForm;
