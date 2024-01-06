import type { FC } from "react";
import type { InitProps, RiderWithProfile } from "~/utils/types";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import MyForm from "../Form/MyForm";

interface Props extends InitProps {
  actionData?: any;
  rider?: RiderWithProfile;
}

const CreateRiderForm: FC<Props> = ({ actionData, rider }) => {
  return (
    <>
      <MyForm.Group>
        <MyForm.Misc>
          <div className="row">
            <div className="col-lg-6">
              <MyForm.Input
                type="text"
                placeholder="First name*"
                label="First Name"
                required
                name="firstname"
                errormessage={actionData?.errors?.firstname}
                defaultValue={rider?.profile.firstname}
              />
            </div>
            <div className="col-lg-6">
              <MyForm.Input
                type="text"
                placeholder="Last name*"
                label="Last Name"
                required
                name="lastname"
                errormessage={actionData?.errors?.firstname}
                defaultValue={rider?.profile.lastname}
              />
            </div>
            {!rider && (
              <>
                <div className="col-12">
                  <MyForm.Input
                    type="email"
                    placeholder="Your email address*"
                    label="Email"
                    required
                    name="email"
                    errormessage={actionData?.errors?.email}
                  />
                </div>
                <div className="col-12">
                  <MyForm.Input
                    type="tel"
                    placeholder="eg. 07......"
                    label="Phone number"
                    required
                    name="phone"
                    minLength={10}
                    maxLength={10}
                    errormessage={actionData?.errors?.phone}
                  />
                </div>
              </>
            )}
          </div>
        </MyForm.Misc>
      </MyForm.Group>
      <MyForm.Group>
        <FormError>{actionData?.error}</FormError>
        {actionData?.success && (
          <FormSuccess>"Success. information updated"</FormSuccess>
        )}
      </MyForm.Group>
    </>
  );
};

export default CreateRiderForm;
