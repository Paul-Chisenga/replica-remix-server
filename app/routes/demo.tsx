import { sendEmail } from "~/services/email.server";

const Demo = () => {
  return <div>Demo</div>;
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
