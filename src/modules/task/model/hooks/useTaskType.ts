import { useParams } from 'react-router-dom';

type TaskType = 'temporary' | 'existing' | 'unknown';

export const useTaskType = (): {
  isTemporary: boolean;
  isExisting: boolean;
  taskType: TaskType;
} => {
  const { id } = useParams<{ id: string }>();


  const isNumeric = id ? /^\d+$/.test(id) : false;


  const isUuid = id ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) : false;

  let taskType: TaskType = 'unknown';
  if (isUuid) taskType = 'temporary';
  else if (isNumeric) taskType = 'existing';

  return {
    isTemporary: taskType === 'temporary',
    isExisting: taskType === 'existing',
    taskType
  };
};
