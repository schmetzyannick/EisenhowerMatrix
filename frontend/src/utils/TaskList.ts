/**
 * Holds infomation about a task list.
 */
export class TaskList {
    /**
     * Corresponding list section title.
     */
  public sectionTitle: string;
  /**
   * Tasks list of the section with following pairs:
   * [TaskId, Text]
   */
  public taskList: Array<[string, string]>;

  /**
   * Task counter. Needs to be counted for every section to
   * set task ident with section title.
   */
  public taskCounter: number;

  /**
   * @param title Section title.
   * @param list Task list.
   * @param counter Task counter.
   */
  constructor(title: string, list: Array<[string, string]> = [], counter: number = 0) {
    this.sectionTitle = title;
    this.taskList = list;
    this.taskCounter = counter;
  }
}
