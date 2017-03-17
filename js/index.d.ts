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
export declare type InstanceId = string;
export interface WorkerInstance {
    WorkerKey: WorkerKey;
    InstanceId: InstanceId;
}
export interface AutoScalerImplementationInfo {
    Name: string;
    HasSetupUI: boolean;
}
export interface IAutoScalerImplementation {
    TranslateToWorkerKeys: (workers: IWorker[]) => Promise<WorkerKey[]>;
    EstimateWorkersLaunchRequest: (state: IAutoScalableState) => Promise<IWorkersLaunchRequest>;
    LaunchInstances: (launchRequest: IWorkersLaunchRequest) => Promise<WorkerInstance[]>;
    TerminateInstances: (workerKeys: WorkerKey[]) => Promise<WorkerInstance[]>;
    getInfo: () => Promise<AutoScalerImplementationInfo>;
}
export interface TerminatingWorker extends WorkerInstance {
    Id: string;
}
export interface LaunchingWorker extends WorkerInstance {
    LaunchingTime: number;
}
export interface LaunchedWorker extends LaunchingWorker {
    Id: string;
    LaunchedTime: number;
    LaunchDurationMS: number;
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
    LaunchingTimeoutMinutes: number;
    LaunchingWorkers: LaunchingWorker[];
}
export interface IGridAutoScaler {
    isScalingUp: () => Promise<boolean>;
    launchNewWorkers: (launchRequest: IWorkersLaunchRequest) => Promise<LaunchingWorker[]>;
    terminateWorkers: (workers: IWorker[]) => Promise<TerminatingWorker[]>;
    isEnabled: () => Promise<boolean>;
    enable: () => Promise<any>;
    disable: () => Promise<any>;
    hasMaxWorkersCap: () => Promise<boolean>;
    hasMinWorkersCap: () => Promise<boolean>;
    getMaxWorkersCap: () => Promise<number>;
    setMaxWorkersCap: (value: number) => Promise<number>;
    getMinWorkersCap: () => Promise<number>;
    setMinWorkersCap: (value: number) => Promise<number>;
    getLaunchingTimeoutMinutes: () => Promise<number>;
    setLaunchingTimeoutMinutes: (value: number) => Promise<number>;
    getTerminateWorkerAfterMinutesIdle: () => Promise<number>;
    setTerminateWorkerAfterMinutesIdle: (value: number) => Promise<number>;
    getRampUpSpeedRatio: () => Promise<number>;
    setRampUpSpeedRatio: (value: number) => Promise<number>;
    getLaunchingWorkers: () => Promise<LaunchingWorker[]>;
    getJSON: () => Promise<IGridAutoScalerJSON>;
    getImplementationInfo: () => Promise<AutoScalerImplementationInfo>;
}
