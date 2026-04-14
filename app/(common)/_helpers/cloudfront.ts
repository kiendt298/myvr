import "server-only";

import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export function getCloudFrontSignedURl({
  url,
  dateLessThan,
  fallbackUrl,
  ...rest
}: {
  url: string;
  dateLessThan: string;
  fallbackUrl?: string;
}) {
  if (!url) return fallbackUrl ?? "";

  return getSignedUrl({
    url,
    dateLessThan,
    privateKey: process.env.S3_CLOUDFRONT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n",
    ) as string,
    keyPairId: process.env.S3_CLOUDFRONT_KEY_PAIR_ID?.replace(
      /\\n/g,
      "\n",
    ) as string,
    ...rest,
  });
}
