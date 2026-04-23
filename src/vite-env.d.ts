interface ImportMetaEnv {
  readonly VITE_RAZORPAY_KEY_ID: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
