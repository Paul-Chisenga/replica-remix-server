import { ActionFunction } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import Accordion from "~/components/Accordion/Accordion";
import Button2 from "~/components/Button/Button2";
import Button3 from "~/components/Button/Button3";
import Button4 from "~/components/Button/Button4";
import LinkButton1 from "~/components/Button/LinkButton1";
import LinkButton2 from "~/components/Button/LinkButton2";
import DynamicFieldWrapper from "~/components/Form/DynamicFieldWrapper";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import Modal from "~/components/Modal/Modal";

const Demo = () => {
  const navigation = useNavigation();
  return (
    <div className="container tw-p-20 tw-mt-20 tw-space-y-4">
      <DynamicFieldWrapper
        count={0}
        onAdd={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRemove={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <p>this is the content</p>
      </DynamicFieldWrapper>
      <br />

      <Accordion.Wrapper id="exmaple" className="tw-mb-10">
        <Accordion.Item.Wrapper>
          <Accordion.Item.Header id="some">
            This is a header
          </Accordion.Item.Header>
          <Accordion.Item.Content headerId="some" accordionId="exmaple">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur in, animi at ipsam nisi dolore, autem nostrum cum
            recusandae totam neque quae facere eligendi asperiores voluptatibus
            vero alias quam magni?
          </Accordion.Item.Content>
        </Accordion.Item.Wrapper>
      </Accordion.Wrapper>
      <Modal.Wrapper show={false} size="md">
        <Modal.Header>Create new task</Modal.Header>
        <Modal.Body>
          <MyForm.Input label="Some label" />
          <MyForm.Input label="Some label" />
          <MyForm.Input label="Some label" />
          <MyForm.Input label="Some label" />
          <MyForm.TextArea />
        </Modal.Body>
      </Modal.Wrapper>
      <Button2>Button 2</Button2>
      <Button3>Button 2</Button3>
      <Button4>Button 2</Button4>
      <LinkButton1 to="" className="">
        Link Button 1
      </LinkButton1>
      <LinkButton2 to="" className="">
        Link Button 2
      </LinkButton2>

      <div className="tw-space-x-4">
        <button className="my-btn outline primary">
          <i className="bi bi-plus-lg"></i> Primary button
        </button>
        <button className="my-btn outline dark">
          <i className="bi bi-plus-lg"></i> Dark button
        </button>
        <div className="tw-inline-block tw-p-4 tw-bg-black">
          <button className="my-btn outline white">
            <i className="bi bi-plus-lg"></i> White Button
          </button>
        </div>
      </div>
      <div className="tw-space-x-4">
        <button className="my-btn fill primary semi-rounded">
          <i className="bi bi-plus-lg"></i> Primary button
        </button>
        <button className="my-btn fill dark">
          <i className="bi bi-plus-lg"></i> Dark button
        </button>
        <div className="tw-inline-block tw-p-4 tw-bg-black">
          <button className="my-btn fill white">
            <i className="bi bi-plus-lg"></i> White Button
          </button>
        </div>
      </div>
      <div className="tw-space-x-4">
        <button className="my-btn text primary">
          <i className="bi bi-plus-lg"></i> Primary button
        </button>
        <button className="my-btn text dark">
          <i className="bi bi-plus-lg"></i> Dark button
        </button>
        <div className="tw-inline-block tw-p-4 tw-bg-black">
          <button className="my-btn text white">
            <i className="bi bi-plus-lg"></i> White Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;

export async function loader() {
  // await sendEmail({
  //   to: { name: "Paul", email: "paulchisenga.p@gmail.com" },
  //   subject: "A demo pdf",
  //   message: `
  //     <div style="display: flex;flex-direction: row;gap: 1rem;padding: 0.5rem 1rem;border-radius: 0.375rem;border: 1px solid #ccc;margin-bottom: 1rem">
  //       <img src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="image" style="max-height: 4rem;border-radius: 0.25rem;margin-right: 1rem" />
  //       <div>
  //         <div style="text-transform: capitalize;"><b>Tomato Souce</b></div>
  //         <div>Price : 456 ksh</div>
  //         <div>No of items : 5</div>
  //       </div>
  //     </div>
  //   `,
  // });

  return null;
}

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 3000);
  });

  return null;
};
