import * as alicloud from '@pulumi/alicloud';

// Create the FC service
const service = new alicloud.fc.Service('qianfeng-pulumi-component-test', {
  name: 'qianfeng-pulumi-component-test',
});

// const AdmZip = require("adm-zip");
// const zipFile = new AdmZip();
// zipFile.addLocalFile("./code/index.js");
// const zipFileName = "code-" + randString(7) + ".zip";
// const fs = require("fs");
// fs.writeFileSync(zipFileName, zipFile.toBuffer());

// Create the FC function.
const func = new alicloud.fc.Function('my-function-1', {
  handler: 'index.handler',
  runtime: 'nodejs10',
  memorySize: 256,
  service: service.name,
  filename: './code.zip',
  name: 'my-function-1',
}, { parent: service, dependsOn: service });


// Helper function.
// function randString(length: number) {
//   var result = '';
//   var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// export const serviceName = service.id;
export const serviceUrn = service.urn;
export const functionUrn = func.urn;
