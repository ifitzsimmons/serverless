'use strict';

module.exports = {
  async existsDeploymentBucket(bucketName) {
    try {
      const result = await this.provider.request('S3', 'getBucketLocation', {
        Bucket: bucketName,
      });

      if (result.LocationConstraint === '') {
        result.LocationConstraint = 'us-east-1';
      }

      if (result.LocationConstraint === 'EU') {
        result.LocationConstraint = 'eu-west-1';
      }

      if (result.LocationConstraint !== this.provider.getRegion()) {
        throw new this.serverless.classes.Error(
          'Deployment bucket is not in the same region as the lambda function'
        );
      }
    } catch (err) {
      throw new this.serverless.classes.Error(
        `Could not locate deployment bucket. Error: ${err.message}`
      );
    }

    return undefined;
  },
};
