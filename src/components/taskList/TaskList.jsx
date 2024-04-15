import styles from "./index.module.scss";
import Task from "../task";
import Loader from "../loader";
import { useState, useEffect } from "react";
import Image from "next/image";

const TaskList = ({
  tasks,
  deleteFunction,
  updateHabitFunction,
  updateDailyFunction,
  updateTodoFunction,
}) => {
  const [hasTasks, setHasTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tasks.length > 0) {
      setHasTasks(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [tasks]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : hasTasks ? (
        <div id="wrapper">
          <div className={styles.scrollbar} id="style-default">
            <div className={styles.force_overflow}>
              <div className={styles.TaskList}>
                {tasks.map((task) => (
                  <div key={task._id} className={styles.TaskItem}>
                    <Task
                      title={task.title}
                      streakCount={task.streak}
                      id={task._id}
                      lastCompleted={task.lastCompleted}
                      deadline={task.deadline}
                      complete={task.complete}
                      deleteFunction={deleteFunction}
                      updateHabitFunction={updateHabitFunction}
                      updateDailyFunction={updateDailyFunction}
                      updateTodoFunction={updateTodoFunction}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noTask}>
          <h5>It's time to start growing!</h5>
          <Image
            src="/leaves2.jpeg"
            alt="leaves"
            width="550"
            height="400"
            className={styles.leaves}
          />
          <h5>Choose your tasks and let's get to work!</h5>
        </div>
      )}
    </div>
  );
};

export default TaskList;
