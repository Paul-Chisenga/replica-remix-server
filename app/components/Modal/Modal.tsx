import React from "react";
import DualRingLoader from "../indicators/DualRingLoader";

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
  onClose?: () => void;
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
  Wrapper: React.FC<WrapperProps>;
  Header: React.FC<HeaderProps>;
  Body: React.FC<BodyProps>;
  Footer: React.FC<FooterProps>;
};

const Modal: ModalObj = {
  // Header
  Header({ children, className, onClose }) {
    return (
      <div
        className={`tw-flex tw-justify-between tw-tracking-wider tw-items-center tw-font-jost tw-text-white tw-px-4 tw-py-4 tw-font-semibold tw-text-lg  tw-bg-primary ${className}`}
      >
        <span>{children}</span>
        <button
          type="button"
          className="tw-bg-transparent  tw-shrink-0 hover:tw-text-white tw-transition-all tw-duration-200"
          onClick={onClose}
          style={{ color: "rgba(255,255,255,.90)" }}
        >
          <i className="bi bi-x-circle"></i>
        </button>
      </div>
    );
  },
  // Body
  Body({ children, className }) {
    return (
      <div className={`tw-px-4 md:tw-px-5 tw-py-5 ${className}`}>
        {children}
      </div>
    );
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
            ${show && "tw-bg-gray-200/70"}
            ${blur && "tw-backdrop-blur-sm"}
            `}
            onClick={onDismiss}
          />
          <div className="tw-absolute tw-inset-0 tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4">
            <div
              style={{ border: "1px solid" }}
              className={`tw-w-full tw-max-h-full tw-rounded-sm tw-border-gray-200 tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out tw-flex tw-flex-col tw-justify-between tw-mx-auto tw-drop-shadow-sm tw-bg-white
              ${show && "tw-scale-100"}
              ${size === "sm" && "tw-max-w-screen-sm sm:tw-my-4 "} 
              ${size === "md" && "tw-max-w-screen-md md:tw-my-4"} 
              ${size === "lg" && "tw-max-w-screen-lg lg:tw-my-4"} 
              ${size === "xl" && "tw-max-w-screen-xl xl:tw-my-4 "} 
              ${size === "2xl" && "tw-max-w-screen-2xl 2xl:tw-my-4"}
              ${className}`}
            >
              {/* Header */}
              <div>{HeaderComponent}</div>
              {/* Body */}
              <div className="tw-flex tw-flex-col tw-flex-1 tw-overflow-y-auto">
                {BodyComponent}
              </div>
              {/* Footer */}
              {!FooterComponent && !hideFooter && (
                <div
                  className="tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-5 tw-border-black/10 tw-bg-gray-100 tw-border-gray-200 tw-gap-4"
                  style={{ borderTop: "2px solid" }}
                >
                  <button
                    type="button"
                    className="my-btn outline dark semi-rounded tw-border-gray-400"
                    onClick={onDismiss}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <div>
                    <button
                      className="my-btn outline primary semi-rounded"
                      onClick={onSubmit}
                      disabled={loading}
                      type="submit"
                    >
                      <span>Submit</span>
                      {loading && <DualRingLoader size={15} />}
                    </button>
                  </div>
                </div>
              )}
              {FooterComponent && FooterComponent}
            </div>
          </div>
        </div>
      </Portal>
    );
  },
};

export default Modal;
