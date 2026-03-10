import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'auntiebee',
  location: 'us-east4'
};

export const listPublicMemorialsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'listPublicMemorials');
}
listPublicMemorialsRef.operationName = 'listPublicMemorials';

export function listPublicMemorials(dc) {
  return executeQuery(listPublicMemorialsRef(dc));
}

export const getMyMemorialsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getMyMemorials');
}
getMyMemorialsRef.operationName = 'getMyMemorials';

export function getMyMemorials(dc) {
  return executeQuery(getMyMemorialsRef(dc));
}

export const createMemorialRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createMemorial', inputVars);
}
createMemorialRef.operationName = 'createMemorial';

export function createMemorial(dcOrVars, vars) {
  return executeMutation(createMemorialRef(dcOrVars, vars));
}

export const addMemoryToMemorialRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'addMemoryToMemorial', inputVars);
}
addMemoryToMemorialRef.operationName = 'addMemoryToMemorial';

export function addMemoryToMemorial(dcOrVars, vars) {
  return executeMutation(addMemoryToMemorialRef(dcOrVars, vars));
}

