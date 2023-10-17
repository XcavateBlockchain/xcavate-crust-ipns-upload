# Crust IPFS/IPNS Upload action
Uploads the contents of ```./dApp``` folder to IPFS, updates ```./dApp/public/.well-known/did-configuration.json```
to point "credentialSubject: origin" to the IPNS ID.
Based mostly on 
crustio/ipfs-upload-action
crustio/ipfs-crust-action.
Please refer to above repositories for further information.
## Repository Settings
### CRUST_SEEDS
The repository must have CRUST_SEEDS secret set to your Crust seeds

### Actions Permissions
Repository's Actions must have Read & Write Permissions set

### Tag
Must correspond to the version in ```package.json```.

## Compiling
### Node version
This code was only tried to compile under node version v14.21.3.
If you change the script and need to recompile it make sure you upgrade the
version number in ```package.json``` and create a new tag in the repository
such that the tag corresponds to the version in ```package.json```.
Example: v0.0.3

```sh
nvm use 14.21.3
node --version
npm run build
```
There are numerous warnings about multiple/deprecated packages,
however I had tough time repairing broken dependencies after trying to dedupe.
