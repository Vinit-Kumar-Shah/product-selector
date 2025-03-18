/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorderDraggableListItems } from "../../lib/utils/helpers";

interface DraggableListProps {
  listComponent: React.ReactNode;
  listData: any;
  setListData: any;
  id: string;
}

const DraggableList: React.FC<DraggableListProps> = ({
  listComponent,
  listData,
  setListData,
  id,
}) => {
  const [droppableId, setDroppableId] = useState("list");

  useEffect(() => {
    setDroppableId(id);
  }, [id]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;
    const reorderedList: any = reorderDraggableListItems(
      listData,
      result.source.index,
      result.destination.index
    );
    setListData(reorderedList);
  };
  
  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {listComponent}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableList;
