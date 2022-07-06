import {
  Compression,
  CostAndUsageReport,
  CURBucket,
  Format,
  TimeUnit,
} from '@cremich/cdk-bill-bot';
import * as core from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CostAndUsageReportStack extends core.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const curBucket = new CURBucket(this, 'bucket');

    const report = new CostAndUsageReport(this, 'cur', {
      bucket: curBucket,
      compression: Compression.PARQUET,
      format: Format.PARQUET,
      timeUnit: TimeUnit.DAILY,
    });

    report.addDataCatalog();
  }
}
