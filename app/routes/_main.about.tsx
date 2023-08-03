import type { V2_MetaFunction } from "@remix-run/node";
import About2 from "~/components/about/About2";
import Breadcrumb from "~/components/common/Breadcrumb";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "About us - Replica restaurant" },
    {
      name: "description",
      content: "About replica!",
    },
  ];
};

const About = () => {
  return (
    <div>
      <Breadcrumb pageName="About Us" pageTitle="About Us" />
      <About2 />
    </div>
  );
};

export default About;
