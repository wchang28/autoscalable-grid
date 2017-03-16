export interface IWorker {
    Id: string; // worker id
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
    CPUDebt: number;                // CPU shortage
    WorkerStates: IWorkerState[];
}

export interface IAutoScalableGrid {
    getWorkers: (workerIds: string[]) => Promise<IWorker[]>;
    disableWorkers: (workerIds: string[]) => Promise<any>;
    setWorkersTerminating: (workerIds: string[]) => Promise<any>;
    getCurrentState: () => Promise<IAutoScalableState>;
}

export type WorkerKey = string; // worker key used to terminate/launch worker, actual implementation decide what this is

export interface IWorkersLaunchRequest {
    NumInstances: number;
    Hint?: any;
}

export type InstanceId = string;

export interface WorkerInstance {
    WorkerKey: WorkerKey;
    InstanceId: InstanceId; // worker instance id (defined in the implementation)
}

export interface AutoScalerImplementationInfo {
    Name: string;   // a meaningful name for the implementation
}

export interface IAutoScalerImplementation {
    TranslateToWorkerKeys: (workers: IWorker[]) => Promise<WorkerKey[]>;     // translate from IWorker to WorkerKey
    EstimateWorkersLaunchRequest: (state: IAutoScalableState) => Promise<IWorkersLaunchRequest>;  // calculate the number of additional workers desired given the current state of the autoscalable
    LaunchInstances: (launchRequest: IWorkersLaunchRequest) => Promise<WorkerInstance[]>;                // actual implementation of launching new workers
    TerminateInstances: (workerKeys: WorkerKey[]) => Promise<WorkerInstance[]>;                          // actual implementation of terminating the workers
    getInfo:  () => Promise<AutoScalerImplementationInfo>;                                          // get the info for the actual implementation
}

export interface TerminatingWorker extends WorkerInstance {
    Id: string; // worker id
}

export interface LaunchingWorker extends WorkerInstance {
    LaunchingTime: number;  // worker launching time
}

export interface LaunchedWorker extends LaunchingWorker {
    Id: string; // worker id
    LaunchedTime: number;  // worker launched time
    LaunchDurationMS: number;   // time to launch the worker in millisecond
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
    getImplementationConfigUrl: () => Promise<string>;
}