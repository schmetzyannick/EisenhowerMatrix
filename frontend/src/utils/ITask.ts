/**
 * Task interface
 */
export interface ITask {
    /**
     * Name of the section.
     */
    listName: string;
    /**
     * Task identifier.
     */
    ident: string;
    /**
     * Text, the user can enter.
     */
    desc: string;
    /**
     * Checkbox state.
     */
    doneState: boolean;
    /**
     * Section position.
     */
    priorityInList: number;
}
