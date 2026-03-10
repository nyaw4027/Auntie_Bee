const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'auntiebee',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const listPublicMemorialsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'listPublicMemorials');
}
listPublicMemorialsRef.operationName = 'listPublicMemorials';
exports.listPublicMemorialsRef = listPublicMemorialsRef;

exports.listPublicMemorials = function listPublicMemorials(dc) {
  return executeQuery(listPublicMemorialsRef(dc));
};

const getMyMemorialsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getMyMemorials');
}
getMyMemorialsRef.operationName = 'getMyMemorials';
exports.getMyMemorialsRef = getMyMemorialsRef;

exports.getMyMemorials = function getMyMemorials(dc) {
  return executeQuery(getMyMemorialsRef(dc));
};

const createMemorialRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createMemorial', inputVars);
}
createMemorialRef.operationName = 'createMemorial';
exports.createMemorialRef = createMemorialRef;

exports.createMemorial = function createMemorial(dcOrVars, vars) {
  return executeMutation(createMemorialRef(dcOrVars, vars));
};

const addMemoryToMemorialRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'addMemoryToMemorial', inputVars);
}
addMemoryToMemorialRef.operationName = 'addMemoryToMemorial';
exports.addMemoryToMemorialRef = addMemoryToMemorialRef;

exports.addMemoryToMemorial = function addMemoryToMemorial(dcOrVars, vars) {
  return executeMutation(addMemoryToMemorialRef(dcOrVars, vars));
};
