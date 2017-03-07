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
    TaskDebt: number;
    WorkerStates: IWorkerState[];
}
export interface IAutoScalableGrid {
    readonly CurrentState: Promise<IAutoScalableState>;
}
