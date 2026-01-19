import { useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const GoogleReCaptchaWrapper = ({
  callback,
  action,
}: {
  callback?: () => Promise<any>;
  action: string;
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha(action);
    console.log(token);
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <button className="text-black" onClick={handleReCaptchaVerify}>
      Verify recaptcha
    </button>
  );
};

export default GoogleReCaptchaWrapper;
