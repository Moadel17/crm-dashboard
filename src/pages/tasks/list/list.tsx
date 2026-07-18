import {
  KanbanBoard,
  KanbanBoardContainer,
} from "@/component/tasks/kanban/kanbanBoard";
import { KanbanColumns } from "../../../component/tasks/kanban/kanbanColumn";
import { KanbanItem } from "@/component/tasks/kanban/kanbanItem";
import { useGo, useList, useNavigation, useUpdate } from "@refinedev/core";
import {
  TASK_STAGES_QUERY,
  TASKS_QUERY,
  UPDATE_TASK_STAGE_MUTATION,
} from "@/graphql/queries";
import { useMemo } from "react";
import { TaskStage } from "@/graphql/schema.types";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { TasksQuery } from "@/graphql/types";
import { TaskCardsMemo } from "@/component/tasks/card/taskCards";
import { KanbanAddCardButton } from "@/component/tasks/card/addCard";
import { PageSkeleton } from "@/component/skeleton/skeleton";
import { DragEndEvent } from "@dnd-kit/core";

export const TasksList = ({ children }: React.PropsWithChildren) => {
  const {
    result: stages,
    query: { isLoading: stagesLoading },
  } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });
  const {
    result: tasks,
    query: { isLoading: tasksLoading },
  } = useList<GetFieldsFromList<TasksQuery>>({
    resource: "tasks",
    sorters: [{ field: "dueDate", order: "asc" }],
    pagination: { mode: "off" },
    queryOptions: {
      enabled: !!stages,
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });
  const { mutate: updateTask } = useUpdate();
  const go = useGo();

  // Get Data From Tasks And Stages To Show It
  const taskStage = useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unnasignedStage: [],
        stages: [],
      };
    }

    const unnasignedStage = tasks.data.filter((task) => task.stageId === null);

    const grouped: any = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter(
        (task) => task?.stageId?.toString() === stage.id,
      ),
    }));

    return {
      unnasignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);
  const isLoading = tasksLoading && stagesLoading;

  // Function Handle Add Tasks Card
  function handleAddCard(argu: { stageId: string }) {
    const path =
      argu.stageId === "unnasigned"
        ? "/tasks/new"
        : `/tasks/new?stageId=${argu.stageId}`;

    go({
      to: path,
      type: "replace",
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) return;

    if (stageId === "unnasigned") {
      stageId = null;
    }

    updateTask({
      id: taskId,
      resource: "tasks",
      values: { stageId: stageId },
      successNotification: false,
      mutationMode: "optimistic",
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
    });
  }

  // If In Loading Show Skeleton Page
  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard DragEnd={handleDragEnd}>
          <KanbanColumns
            id="unnasigned"
            title={"unnasigned"}
            count={taskStage.unnasignedStage.length || 0}
            clickAdd={() => handleAddCard({ stageId: "unnasigned" })}>
            {taskStage.unnasignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: "unnasigned" }}>
                <TaskCardsMemo {...task} dueDate={task.dueDate || undefined} />
              </KanbanItem>
            ))}

            {!taskStage.unnasignedStage.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: "unnasigned" })}
              />
            )}
          </KanbanColumns>

          {taskStage.columns?.map((column: any) => (
            <KanbanColumns
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              clickAdd={() => handleAddCard({ stageId: column.id })}>
              {!isLoading &&
                column.tasks.map((task: any) => (
                  <KanbanItem id={task.id} key={task.id}>
                    <TaskCardsMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: "unnasigned" })}
                />
              )}
            </KanbanColumns>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};
