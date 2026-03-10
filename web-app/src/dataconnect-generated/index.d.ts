import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMemoryToMemorialData {
  memory_insert: Memory_Key;
}

export interface AddMemoryToMemorialVariables {
  memorialId: UUIDString;
  type: string;
  text?: string | null;
  imageUrl?: string | null;
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateMemorialData {
  memorial_insert: Memorial_Key;
}

export interface CreateMemorialVariables {
  firstName: string;
  lastName: string;
  dateOfBirth: DateString;
  dateOfDeath: DateString;
  isPublic: boolean;
  eulogy?: string | null;
  profilePhotoUrl?: string | null;
}

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

export interface Memorial_Key {
  id: UUIDString;
  __typename?: 'Memorial_Key';
}

export interface Memory_Key {
  id: UUIDString;
  __typename?: 'Memory_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListPublicMemorialsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicMemorialsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicMemorialsData, undefined>;
  operationName: string;
}
export const listPublicMemorialsRef: ListPublicMemorialsRef;

export function listPublicMemorials(): QueryPromise<ListPublicMemorialsData, undefined>;
export function listPublicMemorials(dc: DataConnect): QueryPromise<ListPublicMemorialsData, undefined>;

interface GetMyMemorialsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyMemorialsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyMemorialsData, undefined>;
  operationName: string;
}
export const getMyMemorialsRef: GetMyMemorialsRef;

export function getMyMemorials(): QueryPromise<GetMyMemorialsData, undefined>;
export function getMyMemorials(dc: DataConnect): QueryPromise<GetMyMemorialsData, undefined>;

interface CreateMemorialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemorialVariables): MutationRef<CreateMemorialData, CreateMemorialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMemorialVariables): MutationRef<CreateMemorialData, CreateMemorialVariables>;
  operationName: string;
}
export const createMemorialRef: CreateMemorialRef;

export function createMemorial(vars: CreateMemorialVariables): MutationPromise<CreateMemorialData, CreateMemorialVariables>;
export function createMemorial(dc: DataConnect, vars: CreateMemorialVariables): MutationPromise<CreateMemorialData, CreateMemorialVariables>;

interface AddMemoryToMemorialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMemoryToMemorialVariables): MutationRef<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMemoryToMemorialVariables): MutationRef<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
  operationName: string;
}
export const addMemoryToMemorialRef: AddMemoryToMemorialRef;

export function addMemoryToMemorial(vars: AddMemoryToMemorialVariables): MutationPromise<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
export function addMemoryToMemorial(dc: DataConnect, vars: AddMemoryToMemorialVariables): MutationPromise<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;

