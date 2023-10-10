import React from "react";

interface WrapperProps {
  children: React.ReactElement | Iterable<React.ReactElement> | null;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  show: boolean;
  hideFooter?: boolean;
  blur?: boolean;
  confirm?: boolean;
  loading?: boolean;
  onDismiss?: () => void;
  onSubmit?: () => void;
}
interface HeaderProps {
  children?: any;
  className?: string;
}
interface BodyProps {
  children?: any;
  className?: string;
}
interface FooterProps {
  children?: any;
  className?: string;
}

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

type ModalObj = {
  Header: React.FC<HeaderProps>;
  Body: React.FC<BodyProps>;
  Footer: React.FC<FooterProps>;
  Wrapper: React.FC<WrapperProps>;
};

const Modal: ModalObj = {
  // Header
  Header({ children, className }) {
    return <div className={`${className}`}>{children}</div>;
  },
  // Body
  Body({ children, className }) {
    return <div className={className}>{children}</div>;
  },
  // Footer
  Footer({ children, className }) {
    return <div className={className}>{children}</div>;
  },
  // Wrapper
  Wrapper({
    show,
    size,
    hideFooter,
    className,
    children,
    blur,
    confirm,
    loading,
    onDismiss,
    onSubmit,
  }) {
    const [showWrapper, setShowWrapper] = React.useState(show);

    let HeaderComponent: React.ReactElement | undefined;
    let BodyComponent: React.ReactElement | undefined;
    let FooterComponent: React.ReactElement | undefined;

    // If Has One child It has to be the body
    if (Array.from(children as any).length === 0) {
      if (
        typeof (children as any).type !== "function" ||
        (children as any).type.name !== "Body"
      ) {
        children = null;
      } else {
        BodyComponent = children as any;
      }
    } else {
      (children as any).forEach((element: any) => {
        if (
          typeof element.type === "function" &&
          element.type.name === "Header"
        ) {
          HeaderComponent = element;
        } else if (
          typeof element.type === "function" &&
          element.type.name === "Body"
        ) {
          BodyComponent = element;
        } else if (
          typeof element.type === "function" &&
          element.type.name === "Footer"
        ) {
          FooterComponent = element;
        }
      });
    }

    React.useEffect(() => {
      if (!show) {
        // manualy delay
        setTimeout(() => {
          setShowWrapper(show);
        }, 100);
      } else {
        setShowWrapper(true);
      }
    }, [show]);

    if (!showWrapper) {
      return null;
    }

    return (
      <Portal>
        <div
          className={`tw-fixed tw-h-0 ${showWrapper && "tw-inset-0 tw-h-auto"}`}
          style={{
            zIndex: 1000,
          }}
        >
          <div
            className={`tw-absolute tw-inset-0 tw-bg-transparent tw-transition-colors tw-duration-200 tw-ease-linear 
            ${show && "tw-bg-black/20"}
            ${blur && "tw-backdrop-blur-xl"}
            `}
            onClick={onDismiss}
          />
          <div className="tw-absolute tw-inset-0 tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center">
            <div
              className={`tw-w-full tw-max-h-full tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out tw-flex tw-flex-col tw-justify-between tw-mx-auto tw-shadow-xl tw-bg-white tw-border-primary
              ${show && "tw-scale-100"}
              ${
                size === "sm" &&
                "tw-max-w-screen-sm sm:tw-rounded-lg sm:tw-my-4 sm:tw-border"
              } 
              ${
                size === "md" &&
                "tw-max-w-screen-md md:tw-rounded-lg md:tw-my-4 md:tw-border"
              } 
              ${
                size === "lg" &&
                "tw-max-w-screen-lg lg:tw-rounded-lg lg:tw-my-4 lg:tw-border"
              } 
              ${
                size === "xl" &&
                "tw-max-w-screen-xl xl:tw-rounded-lg xl:tw-my-4 xl:tw-border"
              } 
              ${
                size === "2xl" &&
                "tw-max-w-screen-2xl 2xl:tw-rounded-lg 2xl:tw-my-4 2xl:tw-border"
              }
              ${className}`}
            >
              {/* Header */}
              <div>{HeaderComponent}</div>
              {/* Body */}
              <div className="tw-flex tw-flex-col tw-flex-1 tw-overflow-y-auto">
                {BodyComponent}
              </div>
              {/* Footer */}
              {/* {!FooterComponent && !hideFooter && (
                <div className="tw-flex tw-items-center tw-justify-between tw-px-8 tw-py-5 tw-border-t tw-border-black/10">
                  <button
                    type="button"
                    className="dashboard_btn_text"
                    onClick={onDismiss}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <div>
                    <button
                      className={confirm ? "remove-btn" : "dashboard_btn_fill"}
                      onClick={onSubmit}
                      disabled={loading}
                      type="submit"
                    >
                      {confirm ? "Confirm" : "Submit"}
                    </button>
                  </div>
                </div>
              )} */}
              {FooterComponent && FooterComponent}
            </div>
          </div>
        </div>
      </Portal>
    );
  },
};

export default Modal;
