import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface WrapperProps extends InitProps {}
interface HeaderWrapperProps extends InitProps {
  id: string;
  centered?: boolean;
}

interface HeaderItemProps extends InitProps {
  id: string;
  defaultSelected?: boolean;
}
interface ContentWrapperProps extends InitProps {
  id: string;
}
interface ContentItemProps extends InitProps {
  id: string;
  defaultSelected?: boolean;
}

type TabObj = {
  Wrapper: FC<WrapperProps>;
  Header: {
    Wrapper: FC<HeaderWrapperProps>;
    Item: FC<HeaderItemProps>;
  };
  Content: {
    Wrapper: FC<ContentWrapperProps>;
    Item: FC<ContentItemProps>;
  };
};

const Tab: TabObj = {
  Wrapper({ children, className }) {
    return <div className={`tab ${className}`}>{children}</div>;
  },
  Header: {
    Wrapper({ children, className, id, centered }) {
      return (
        <ul
          className={`nav nav-tabs ${
            !centered && "tw-justify-start"
          } ${className}`}
          id={id}
          role="tablist"
          style={{ borderBottom: "1px solid transparent" }}
        >
          {children}
        </ul>
      );
    },
    Item({ children, className, id, defaultSelected }) {
      return (
        <li className={`nav-item ${className}`} role="presentation">
          <button
            className={`nav-link ${defaultSelected && "active"}`}
            id={`${id}-tab`}
            data-bs-toggle="tab"
            data-bs-target={`#${id}`}
            type="button"
            role="tab"
            aria-controls={`${id}`}
            aria-selected={!!defaultSelected}
          >
            {children}
          </button>
        </li>
      );
    },
  },
  Content: {
    Wrapper({ children, className, id }) {
      return (
        <div
          className={`tab-content tw-pt-8 ${className}`}
          id={id}
          role="tablist"
        >
          {children}
        </div>
      );
    },
    Item({ children, className, id, defaultSelected }) {
      return (
        <div
          className={`tab-pane fade  ${
            defaultSelected && "show active"
          } ${className}`}
          id={`${id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab`}
        >
          {children}
        </div>
      );
    },
  },
};

export default Tab;
