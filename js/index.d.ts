/// <reference types="es6-promise" />
export interface WorkerIdentifier {
    Id: string;
    Name: string;
}
export interface IWorkerState extends WorkerIdentifier {
    Busy: boolean;
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
}
