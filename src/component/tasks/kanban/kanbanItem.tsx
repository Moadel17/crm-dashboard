import {
  DragOverlay,
  useDraggable,
  UseDraggableArguments,
} from "@dnd-kit/core";

type Props = {
  id: string;
  data?: UseDraggableArguments["data"];
};

export const KanbanItem = ({
  children,
  id,
  data,
}: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}>
        {children}
      </div>
      {active?.id === id && (
        <DragOverlay>
          <div
            style={{
              borderRadius: "8px",
              cursor: "grabbing",
              boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
            }}>
            {children}
          </div>
        </DragOverlay>
      )}
    </div>
  );
};
