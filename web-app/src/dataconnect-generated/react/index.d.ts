import { ListPublicMemorialsData, GetMyMemorialsData, CreateMemorialData, CreateMemorialVariables, AddMemoryToMemorialData, AddMemoryToMemorialVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListPublicMemorials(options?: useDataConnectQueryOptions<ListPublicMemorialsData>): UseDataConnectQueryResult<ListPublicMemorialsData, undefined>;
export function useListPublicMemorials(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicMemorialsData>): UseDataConnectQueryResult<ListPublicMemorialsData, undefined>;

export function useGetMyMemorials(options?: useDataConnectQueryOptions<GetMyMemorialsData>): UseDataConnectQueryResult<GetMyMemorialsData, undefined>;
export function useGetMyMemorials(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyMemorialsData>): UseDataConnectQueryResult<GetMyMemorialsData, undefined>;

export function useCreateMemorial(options?: useDataConnectMutationOptions<CreateMemorialData, FirebaseError, CreateMemorialVariables>): UseDataConnectMutationResult<CreateMemorialData, CreateMemorialVariables>;
export function useCreateMemorial(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMemorialData, FirebaseError, CreateMemorialVariables>): UseDataConnectMutationResult<CreateMemorialData, CreateMemorialVariables>;

export function useAddMemoryToMemorial(options?: useDataConnectMutationOptions<AddMemoryToMemorialData, FirebaseError, AddMemoryToMemorialVariables>): UseDataConnectMutationResult<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
export function useAddMemoryToMemorial(dc: DataConnect, options?: useDataConnectMutationOptions<AddMemoryToMemorialData, FirebaseError, AddMemoryToMemorialVariables>): UseDataConnectMutationResult<AddMemoryToMemorialData, AddMemoryToMemorialVariables>;
