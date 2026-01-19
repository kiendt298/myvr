import { headers } from "next/headers";

export async function reCaptchaCreateAssesment({
  token,
  expectedAction,
}: {
  token: string | undefined;
  expectedAction: string | undefined;
}) {
  const headersList = headers();
  const requestPayload = {
    event: {
      token,
      siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      userAgent: headersList.get("user-agent"),
      expectedAction,
    },
  };

  const res = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/trumvr/assessments?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    },
  );
  const data = await res.json();
  const { event, riskAnalysis, tokenProperties } = data;
  if (riskAnalysis.score <= 0.5) return false;

  if (!tokenProperties.valid) return false;

  if (event.expectedAction !== tokenProperties.action) return false;

  return true;
}
