/// <reference types="es6-promise" />
export interface IWorker {
    Id: string;
    Name: string;
    RemoteAddress: string;
    RemotePort?: number;
}
export interface IWorkerState extends IWorker {
    Busy: boolean;
    Enabled: boolean;
    Terminating: boolean;
    LastIdleTime: number;
}
export interface IAutoScalableState {
    CurrentTime: number;
    QueueEmpty: boolean;
    CPUDebt: number;
    WorkerStates: IWorkerState[];
}
export interface IAutoScalableGrid {
    getWorkers: (workerIds: string[]) => Promise<IWorker[]>;
    disableWorkers: (workerIds: string[]) => Promise<any>;
    setWorkersTerminating: (workerIds: string[]) => Promise<any>;
    getCurrentState: () => Promise<IAutoScalableState>;
}
export declare type WorkerKey = string;
export interface IWorkersLaunchRequest {
    NumInstances: number;
    Hint?: any;
}
export interface IAutoScalerImplementation {
    TranslateToWorkerKeys: (workers: IWorker[]) => Promise<WorkerKey[]>;
    EstimateWorkersLaunchRequest: (state: IAutoScalableState) => Promise<IWorkersLaunchRequest>;
    LaunchInstances: (launchRequest: IWorkersLaunchRequest) => Promise<WorkerKey[]>;
    TerminateInstances: (workerKeys: WorkerKey[]) => Promise<WorkerKey[]>;
    getConfigUrl: () => Promise<string>;
}
export interface IGridAutoScalerJSON {
    ScalingUp: boolean;
    Enabled: boolean;
    HasMaxWorkersCap: boolean;
    MaxWorkersCap: number;
    HasMinWorkersCap: boolean;
    MinWorkersCap: number;
    TerminateWorkerAfterMinutesIdle: number;
    RampUpSpeedRatio: number;
    LaunchingWorkers: WorkerKey[];
}
export interface IGridAutoScaler {
    isScalingUp: () => Promise<boolean>;
    launchNewWorkers: (launchRequest: IWorkersLaunchRequest) => Promise<boolean>;
    terminateWorkers: (workers: IWorker[]) => Promise<boolean>;
    isEnabled: () => Promise<boolean>;
    enable: () => Promise<any>;
    disable: () => Promise<any>;
    hasMaxWorkersCap: () => Promise<boolean>;
    hasMinWorkersCap: () => Promise<boolean>;
    getMaxWorkersCap: () => Promise<number>;
    setMaxWorkersCap: (value: number) => Promise<number>;
    getMinWorkersCap: () => Promise<number>;
    setMinWorkersCap: (value: number) => Promise<number>;
    getTerminateWorkerAfterMinutesIdle: () => Promise<number>;
    setTerminateWorkerAfterMinutesIdle: (value: number) => Promise<number>;
    getRampUpSpeedRatio: () => Promise<number>;
    setRampUpSpeedRatio: (value: number) => Promise<number>;
    getLaunchingWorkers: () => Promise<WorkerKey[]>;
    getJSON: () => Promise<IGridAutoScalerJSON>;
    getImplementationConfigUrl: () => Promise<string>;
}
