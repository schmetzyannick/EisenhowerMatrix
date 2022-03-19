import { TaskListEnum } from "../../../shared/types/TaskListEnum";

/**
 * Holds infomation about a task list.
 */
export class TaskSection {
    /**
     * Corresponding list section title.
     */
  public sectionTitle: TaskListEnum;
  /**
   * Tasks list of the section with following pairs:
   * [TaskId, Text, Done state]
   */
  public taskList: Array<[string, string, boolean]>;

  /**
   * @param title Section title.
   * @param list Task list.
   */
  constructor(title: TaskListEnum, list: Array<[string, string, boolean]> = []) {
    this.sectionTitle = title;
    this.taskList = list;
  }
}
