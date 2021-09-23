import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
const Todo = () => {
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    completed: {
      title: "Completed",
      items: [],
    },
  });
  return (
    <div>
      <DragDropContext
        onDragEnd={(e) => {
          console.log(e);
        }}
      >
        {_.map(state, (data, key) => {
          return (
            <div>
              <h3>{data.title}</h3>
              <Droppable droppableID={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    ></div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Todo;
