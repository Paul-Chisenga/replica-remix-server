import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigation,
  useRouteError,
  useSubmit,
} from "@remix-run/react";
import mainStyles from "./styles/main.css";
import { useEffect, useRef } from "react";
import type { ReactNode, FC } from "react";
import CartContextProvider from "./context/CartContext";
import NotFound from "./components/errors/404";
import Error1 from "./components/errors/Error1";
import LoadingBar from "react-top-loading-bar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mainStyles },
];

const Document: FC<{ title?: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
        <link rel="icon" href="/images/icon/logo-icon.svg" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src="/js/bootstrap.bundle.min.js"></script>
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  const navigation = useNavigation();
  const ref = useRef<any>(null);

  useEffect(() => {
    if (navigation.state === "loading") {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [navigation.state]);

  return (
    <Document>
      <LoadingBar color={"#34d399"} ref={ref} />
      <CartContextProvider>
        <Outlet />
      </CartContextProvider>
      {/* {navigation.state === "submitting" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <Spinner />
        </div>
      )} */}
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as any;
  const submit = useSubmit();

  useEffect(() => {
    if (error.status === 401) {
      submit(null, {
        action: "/logout",
        method: "POST",
      });
    }
  }, [error.status, submit]);

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <NotFound />
        {/* <ErrorBox
          title={error.status === 404 ? "404" : error.statusText}
          message={
            error.data?.message ??
            (error.status === 404 ? "Page not found" : "Something went wrong")
          }
        /> */}
      </Document>
    );
  }

  let errorMessage = "Unknown error";
  if (error.message) {
    errorMessage = error.message;
  }
  return (
    <Document title={"error"}>
      <Error1 errorMessage={errorMessage} />
      {/* <ErrorBox title={"Error"} message={errorMessage} /> */}
    </Document>
  );
}
