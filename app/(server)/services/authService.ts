import { GoogleReCaptchaActionEnum } from "@/app/(common)/_utils/enums";
import { IUser } from "../database/models/User";
import { reCaptchaCreateAssesment } from "./thirdPartyService";
import { getUserDetailByPhoneNumber } from "./userService";

const authService = {
  authenticate: async (
    phoneNumber: string,
    password: string,
    reCaptchaToken: string,
  ) => {
    try {
      const reCaptchaResult = await reCaptchaCreateAssesment({
        token: reCaptchaToken,
        expectedAction: GoogleReCaptchaActionEnum.SIGN_IN_SUBMIT,
      });
      if (!reCaptchaResult) throw new Error("Do not pass ReCaptcha validation");

      const user: IUser | null = await getUserDetailByPhoneNumber(phoneNumber);
      if (user && user.user_password === password) {
        return user;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default authService;
