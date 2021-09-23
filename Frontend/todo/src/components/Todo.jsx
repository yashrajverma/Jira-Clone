import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { AuthContext } from '../reducer/Reducer'
import { useHistory } from 'react-router-dom'

const Todo = () => {
  const history = useHistory()
  const { token, email } = useContext(AuthContext);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (token === "" && localToken === "") {
      history.push("/signin");
    }
  }, [])
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
