export interface IWorker {
    Id: string;
    Name: string;
    RemoteAddress: string;
    RemotePort: number;
}

export interface IWorkerState extends IWorker {
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
    getCurrentState: () => Promise<IAutoScalableState>;
}