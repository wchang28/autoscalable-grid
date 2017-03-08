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
    CPUDebt: number;                // CPU shortage
    WorkerStates: IWorkerState[];
}

export interface IAutoScalableGrid {
    readonly CurrentState: Promise<IAutoScalableState>;
}