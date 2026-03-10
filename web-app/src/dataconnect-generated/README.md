# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*listPublicMemorials*](#listpublicmemorials)
  - [*getMyMemorials*](#getmymemorials)
- [**Mutations**](#mutations)
  - [*createMemorial*](#creatememorial)
  - [*addMemoryToMemorial*](#addmemorytomemorial)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## listPublicMemorials
You can execute the `listPublicMemorials` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicMemorials(): QueryPromise<ListPublicMemorialsData, undefined>;

interface ListPublicMemorialsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicMemorialsData, undefined>;
}
export const listPublicMemorialsRef: ListPublicMemorialsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicMemorials(dc: DataConnect): QueryPromise<ListPublicMemorialsData, undefined>;

interface ListPublicMemorialsRef {
  ...
  (dc: DataConnect): QueryRef<ListPublicMemorialsData, undefined>;
}
export const listPublicMemorialsRef: ListPublicMemorialsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicMemorialsRef:
```typescript
const name = listPublicMemorialsRef.operationName;
console.log(name);
```

### Variables
The `listPublicMemorials` query has no variables.
### Return Type
Recall that executing the `listPublicMemorials` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicMemorialsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPublicMemorialsData {
  memorials: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    dateOfBirth: DateString;
    dateOfDeath: DateString;
    profilePhotoUrl?: string | null;
  } & Memorial_Key)[];
}
```
### Using `listPublicMemorials`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicMemorials } from '@dataconnect/generated';


// Call the `listPublicMemorials()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicMemorials();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicMemorials(dataConnect);

console.log(data.memorials);

// Or, you can use the `Promise` API.
listPublicMemorials().then((response) => {
  const data = response.data;
  console.log(data.memorials);
});
```

### Using `listPublicMemorials`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicMemorialsRef } from '@dataconnect/generated';


// Call the `listPublicMemorialsRef()` function to get a reference to the query.
const ref = listPublicMemorialsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicMemorialsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.memorials);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.memorials);
});
```

## getMyMemorials
You can execute the `getMyMemorials` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyMemorials(): QueryPromise<GetMyMemorialsData, undefined>;

interface GetMyMemorialsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyMemorialsData, undefined>;
}
export const getMyMemorialsRef: GetMyMemorialsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyMemorials(dc: DataConnect): QueryPromise<GetMyMemorialsData, undefined>;

interface GetMyMemorialsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyMemorialsData, undefined>;
}
export const getMyMemorialsRef: GetMyMemorialsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyMemorialsRef:
```typescript
const name = getMyMemorialsRef.operationName;
console.log(name);
```

### Variables
The `getMyMemorials` query has no variables.
### Return Type
Recall that executing the `getMyMemorials` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyMemorialsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyMemorialsData {
  memorials: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    dateOfBirth: DateString;
    dateOfDeath: DateString;
    isPublic: boolean;
    createdAt: TimestampString;
    profilePhotoUrl?: string | null;
  } & Memorial_Key)[];
}
```
### Using `getMyMemorials`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyMemorials } from '@dataconnect/generated';


// Call the `getMyMemorials()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyMemorials();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyMemorials(dataConnect);

console.log(data.memorials);

// Or, you can use the `Promise` API.
getMyMemorials().then((response) => {
  const data = response.data;
  console.log(data.memorials);
});
```

### Using `getMyMemorials`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyMemorialsRef } from '@dataconnect/generated';


// Call the `getMyMemorialsRef()` function to get a reference to the query.
const ref = getMyMemorialsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyMemorialsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.memorials);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.memorials);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## createMemorial
You can execute the `createMemorial` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMemorial(vars: CreateMemorialVariables): MutationPromise<CreateMemorialData, CreateMemorialVariables>;

interface CreateMemorialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemorialVariables): MutationRef<CreateMemorialData, CreateMemorialVariables>;
}
export const createMemorialRef: CreateMemorialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMemorial(dc: DataConnect, vars: CreateMemorialVariables): MutationPromise<CreateMemorialData, CreateMemorialVariables>;

interface CreateMemorialRef {
  ...
  (dc: DataConnect, vars: CreateMemorialVariables): MutationRef<CreateMemorialData, CreateMemorialVariables>;
}
export const createMemorialRef: CreateMemorialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMemorialRef:
```typescript
const name = createMemorialRef.operationName;
console.log(name);
```

### Variables
The `createMemorial` mutation requires an argument of type `CreateMemorialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMemorialVariables {
  firstName: string;
  lastName: string;
  dateOfBirth: DateString;
  dateOfDeath: DateString;
  isPublic: boolean;
  eulogy?: string | null;
  profilePhotoUrl?: string | null;
}
```
### Return Type
Recall that executing the `createMemorial` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMemorialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMemorialData {
  memorial_insert: Memorial_Key;
}
```
### Using `createMemorial`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMemorial, CreateMemorialVariables } from '@dataconnect/generated';

// The `createMemorial` mutation requires an argument of type `CreateMemorialVariables`:
const createMemorialVars: CreateMemorialVariables = {
  firstName: ..., 
  lastName: ..., 
  dateOfBirth: ..., 
  dateOfDeath: ..., 
  isPublic: ..., 
  eulogy: ..., // optional
  profilePhotoUrl: ..., // optional
};

// Call the `createMemorial()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMemorial(createMemorialVars);
// Variables can be defined inline as well.
const { data } = await createMemorial({ firstName: ..., lastName: ..., dateOfBirth: ..., dateOfDeath: ..., isPublic: ..., eulogy: ..., profilePhotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMemorial(dataConnect, createMemorialVars);

console.log(data.memorial_insert);

// Or, you can use the `Promise` API.
createMemorial(createMemorialVars).then((response) => {
  const data = response.data;
  console.log(data.memorial_insert);
});
```

### Using `createMemorial`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMemorialRef, CreateMemorialVariables } from '@dataconnect/generated';

// The `createMemorial` mutation requires an argument of type `CreateMemorialVariables`:
const createMemorialVars: CreateMemorialVariables = {
  firstName: ..., 
  lastName: ..., 
  dateOfBirth: ..., 
  dateOfDeath: ..., 
  isPublic: ..., 
  eulogy: ..., // optional
  profilePhotoUrl: ..., // optional
};

// Call the `createMemorialRef()` function to get a reference to the mutation.
const ref = createMemorialRef(createMemorialVars);
// Variables can be defined inline as well.
const ref = createMemorialRef({ firstName: ..., lastName: ..., dateOfBirth: ..., dateOfDeath: ..., isPublic: ..., eulogy: ..., profilePhotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMemorialRef(dataConnect, createMemorialVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.memorial_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.memorial_insert);
});
```

## addMemoryToMemorial
You can execute the `addMemoryToMemorial` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addMemoryToMemorial(vars: AddMemoryToMemorialVariables): MutationPromise<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;

interface AddMemoryToMemorialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMemoryToMemorialVariables): MutationRef<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
}
export const addMemoryToMemorialRef: AddMemoryToMemorialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addMemoryToMemorial(dc: DataConnect, vars: AddMemoryToMemorialVariables): MutationPromise<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;

interface AddMemoryToMemorialRef {
  ...
  (dc: DataConnect, vars: AddMemoryToMemorialVariables): MutationRef<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
}
export const addMemoryToMemorialRef: AddMemoryToMemorialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addMemoryToMemorialRef:
```typescript
const name = addMemoryToMemorialRef.operationName;
console.log(name);
```

### Variables
The `addMemoryToMemorial` mutation requires an argument of type `AddMemoryToMemorialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddMemoryToMemorialVariables {
  memorialId: UUIDString;
  type: string;
  text?: string | null;
  imageUrl?: string | null;
}
```
### Return Type
Recall that executing the `addMemoryToMemorial` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddMemoryToMemorialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddMemoryToMemorialData {
  memory_insert: Memory_Key;
}
```
### Using `addMemoryToMemorial`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addMemoryToMemorial, AddMemoryToMemorialVariables } from '@dataconnect/generated';

// The `addMemoryToMemorial` mutation requires an argument of type `AddMemoryToMemorialVariables`:
const addMemoryToMemorialVars: AddMemoryToMemorialVariables = {
  memorialId: ..., 
  type: ..., 
  text: ..., // optional
  imageUrl: ..., // optional
};

// Call the `addMemoryToMemorial()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addMemoryToMemorial(addMemoryToMemorialVars);
// Variables can be defined inline as well.
const { data } = await addMemoryToMemorial({ memorialId: ..., type: ..., text: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addMemoryToMemorial(dataConnect, addMemoryToMemorialVars);

console.log(data.memory_insert);

// Or, you can use the `Promise` API.
addMemoryToMemorial(addMemoryToMemorialVars).then((response) => {
  const data = response.data;
  console.log(data.memory_insert);
});
```

### Using `addMemoryToMemorial`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addMemoryToMemorialRef, AddMemoryToMemorialVariables } from '@dataconnect/generated';

// The `addMemoryToMemorial` mutation requires an argument of type `AddMemoryToMemorialVariables`:
const addMemoryToMemorialVars: AddMemoryToMemorialVariables = {
  memorialId: ..., 
  type: ..., 
  text: ..., // optional
  imageUrl: ..., // optional
};

// Call the `addMemoryToMemorialRef()` function to get a reference to the mutation.
const ref = addMemoryToMemorialRef(addMemoryToMemorialVars);
// Variables can be defined inline as well.
const ref = addMemoryToMemorialRef({ memorialId: ..., type: ..., text: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addMemoryToMemorialRef(dataConnect, addMemoryToMemorialVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.memory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.memory_insert);
});
```

