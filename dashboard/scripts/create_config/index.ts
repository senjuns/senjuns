import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import { compile } from 'handlebars';
import { join } from 'path';

const OUTPUT_TEMPLATE_URI = './config_template.js';
const OUTPUT_URI = join(__dirname, '../../src/shared/config/config.ts');

/**
 * Fills in handlebars template with parameters and returns the filled  in template.
 *
 * @param {string} fileUri template path
 * @param {object} parameters parameters for the template
 * @returns {string} template
 */
const buildHbsTemplate = (fileUri: string, parameters: object) => {
  const hbsString = readFileSync(fileUri, 'utf-8');
  const commandTemplate = compile(hbsString);
  return commandTemplate(parameters);
};

/**
 * This script reaches out to the info endpoint and uses that response
 * to create the config that will be used for the react app.
 *
 */
const main = async () => {
  const stage = process.env.STAGE;
  if (stage === undefined) {
    throw new Error(
      'Error: STAGE not set. Set STAGE example: export STAGE=prod',
    );
  }
  const dashboardInfoUrl = `https://dashboard-info.${stage}.senjuns.com`;
  if (stage === 'prod') {
    const dashboardInfoUrl = 'https://dashboard-info.senjuns.com';
  }
  const { data } = await axios.get(dashboardInfoUrl);
  console.log(`\ninfo response: ${JSON.stringify(data, null, 2)}`);
  if (data === undefined || data === null) {
    throw new Error(`No response from endpoint: ${dashboardInfoUrl}`);
  }
  const config = buildHbsTemplate(OUTPUT_TEMPLATE_URI, {
    ...data,
    region: 'eu-central-1',
  });
  writeFileSync(OUTPUT_URI, config, { flag: 'w+' });
  console.log(`\nconfig:\n${config}`);
};

main();
