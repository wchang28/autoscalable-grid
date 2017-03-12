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
    CPUDebt: number;                // CPU shortage
    WorkerStates: IWorkerState[];
}

export interface IAutoScalableGrid {
    getCurrentState: () => Promise<IAutoScalableState>;
    disableWorkers: (workerIds: string[]) => Promise<any>;
    setWorkersTerminating: (workerIds: string[]) => Promise<any>;
}

export type WorkerKey = string; // worker key used to terminate/launch worker, actual implementation decide what this is

export interface IWorkersLaunchRequest {
    NumInstances: number;
    Hint?: any;
}

export interface IAutoScalerImplementation {
    TranslateToWorkerKeys: (workers: IWorker[]) => Promise<WorkerKey[]>;     // translate from IWorker to WorkerKey
    EstimateWorkersLaunchRequest: (state: IAutoScalableState) => Promise<IWorkersLaunchRequest>;  // calculate the number of additional workers desired given the current state of the autoscalable
    LaunchInstances: (launchRequest: IWorkersLaunchRequest) => Promise<WorkerKey[]>;                // actual implementation of launching new workers
    TerminateInstances: (workerKeys: WorkerKey[]) => Promise<WorkerKey[]>;                          // actual implementation of terminating the workers
    getConfigUrl:  () => Promise<string>;                                                           // configuration url for the actual implementation
}

export interface IGridAutoScalerJSON {
    ScalingUp: boolean;
    Enabled: boolean;
    HasMaxWorkersCap: boolean;
    MaxWorkersCap: number;
    HasMinWorkersCap: boolean;
    MinWorkersCap: number;
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
    hasMixWorkersCap: () => Promise<boolean>;
    getMaxWorkersCap: () => Promise<number>;
    setMaxWorkersCap: (value: number) => Promise<number>;
    getMinWorkersCap: () => Promise<number>;
    setMinWorkersCap: (value: number) => Promise<number>;
    getLaunchingWorkers: () => Promise<WorkerKey[]>;
    getJSON: () => Promise<IGridAutoScalerJSON>;
    getImplementationConfigUrl: () => Promise<string>;
}