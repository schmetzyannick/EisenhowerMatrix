/**
 * Holds infomation about a task list.
 */
export class TaskSection {
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
   * @param title Section title.
   * @param list Task list.
   * @param counter Task counter.
   */
  constructor(title: string, list: Array<[string, string]> = [], counter: number = 0) {
    this.sectionTitle = title;
    this.taskList = list;
  }
}
