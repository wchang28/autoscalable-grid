/// <reference types="es6-promise" />
export interface IWorker {
    Id: string;
    Name: string;
    RemoteAddress: string;
    RemotePort: number;
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
    getCurrentState: () => Promise<IAutoScalableState>;
    disableWorkers: (workersId: string[]) => Promise<any>;
    setWorkersTerminating: (workersId: string[]) => Promise<any>;
}
