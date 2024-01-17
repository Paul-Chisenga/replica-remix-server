import type { FC, ReactNode } from "react";
import type { InitProps } from "~/utils/types";

interface WrapperProps extends InitProps {
  id: string;
}
interface HeaderWrapperProps extends InitProps {
  id: string;
  after?: ReactNode;
}
interface ContentProps extends InitProps {
  accordionId: string;
  headerId: string;
}

type AccordionObj = {
  Wrapper: FC<WrapperProps>;
  Item: {
    Wrapper: FC<InitProps>;
    Header: FC<HeaderWrapperProps>;
    Content: FC<ContentProps>;
  };
};

const Accordion: AccordionObj = {
  Wrapper({ className, children, id }) {
    return (
      <div className={`my-accordion accordion ${className}`} id={id}>
        {children}
      </div>
    );
  },
  Item: {
    Wrapper({ className, children }) {
      return <div className={`accordion-item ${className}`}>{children}</div>;
    },
    Header({ className, children, id, after }) {
      return (
        <div className={`accordion-header`} id={id}>
          <div className="tw-relative">
            <button
              type="button"
              className={`accordion-button collapsed ${className}`}
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${id}`}
              aria-expanded="false"
              aria-controls={`collapse${id}`}
            >
              {children}
            </button>
            {after}
          </div>
        </div>
      );
    },
    Content({ children, className, accordionId, headerId }) {
      return (
        <div
          id={`collapse${headerId}`}
          className="accordion-collapse collapse"
          data-bs-parent={`#${accordionId}`}
          aria-labelledby={`${headerId}`}
        >
          <div className={`accordion-body ${className}`}>{children}</div>
        </div>
      );
    },
  },
};

export default Accordion;
