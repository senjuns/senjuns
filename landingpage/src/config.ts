export type TConfig = {
  MAIL_SUBMIT_API: string;
};

const configDev: TConfig = {
  MAIL_SUBMIT_API: 'https://mail.dev.neatleaf.com',
};

const configProd: TConfig = {
  MAIL_SUBMIT_API: 'https://mail.neatleaf.com',
};

let config: TConfig = configDev;
if (
  process.env.REACT_APP_STAGE === 'prod' ||
  process.env.REACT_APP_STAGE === 'production'
) {
  config = configProd;
}

export default config;
