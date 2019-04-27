const builder = require('electron-builder');
const Platform = builder.Platform;

function getCurrentPlatform(){
  switch(process.platform){
    case 'win32':
      return Platform.WINDOWS;
    case 'darwin':
      return Platform.MAC;
    case 'linux':
      return Platform.linux;
    default:
      console.error('Cannot resolve current platform!');
      return undefined;
  }
}

builder.build({
  targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
  config: {
    appId: 'electron-react-starter',
    productName: 'Electron React Starter',
    artifactName: '${productName} Setup.${ext}',
    files: [
      "build/**/",
      "node_modules/**/*"
    ],
    directories: {
      buildResources: 'assets'
    },
    extraMetadata: {
      main: "build/electron.js"
    }
  }
}).then(() => {
  console.log('Build complete!');
}).catch(err => {
  console.error('Error during build!', err);
});