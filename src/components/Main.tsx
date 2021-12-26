import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../store";
import { Todo } from "../model";
import { changeItemStatus, deleteItem } from "../features/todoSlice";
import TrashIcon from "./Icons/Trashıcon";
import CheckIcon from "./Icons/CheckIcon";

const Main = () => {
  const state = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const item = state[source.droppableId].items[source.index];

    dispatch(changeItemStatus({ item, source, destination }));
  };

  const onDeleteItem = (id: string, key: string) => {
    dispatch(deleteItem({ id, key }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {_.map(state, (data, key) => {
        return (
          <div key={key} className="column">
            <h3>{data.title}</h3>
            <Droppable droppableId={key}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable_col"
                  >
                    {data.items.map((item: Todo, index: number) => {
                      return (
                        <Draggable
                          key={item.id}
                          index={index}
                          draggableId={item.id}
                        >
                          {(provided) => {
                            return (
                              <div
                                className={"item"}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <span className="task-itself">{item.name}</span>
                                {key !== "done" ? (
                                  <small>{item.date}</small>
                                ) : (
                                  <CheckIcon />
                                )}
                                <span
                                  className="trash"
                                  onClick={() => onDeleteItem(item.id, key)}
                                >
                                  <TrashIcon />
                                </span>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      })}
    </DragDropContext>
  );
};

export default Main;
