import { VN_REWRITE_SEGMENT_URLS } from './app/(common)/_utils/rewrite-urls.js';

/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return ALIAS_ROUTING;
  },
};

export default nextConfig;

const ALIAS_ROUTING = [
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.quotation}/:id`, // alias
    destination: "/quotation/:id", // original
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.services}`,
    destination: "/services",
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.service}/:slug`,
    destination: "/service/:slug",
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.contact}`,
    destination: "/contact",
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.signIn}`,
    destination: "/sign-in",
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.post}/:slug`,
    destination: "/post/:slug",
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.posts}/:slug`,
    destination: "/posts/:slug",
  },
  {
    source: `/${VN_REWRITE_SEGMENT_URLS.manageAccount}`,
    destination: "/manage-account",
  },
];
