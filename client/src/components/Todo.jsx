import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _, { escapeRegExp } from "lodash";
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import setting from '../Assets/img/setting 1.svg'
import home from '../Assets/img/Vector-1.svg'
import stats from '../Assets/img/Group.svg'
import project from '../Assets/img/Vector.svg'
import chat from '../Assets/img/Group-2.svg'
import calender from '../Assets/img/bi_calendar-date.svg'
import logout from '../Assets/img/Group-1.svg'
import addButton from '../Assets/img/Vector.png'
import { BASE_URL } from '../env'
// import { data } from './data'

const Todo = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  // console.log("token", token, "email", email);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [TaskMessage, setTaskMessage] = useState("")
  const [todoArray, setTaskArray] = useState([])
  const [user, setUser] = useState({})
  const [in_progessArray, setInProgressArray] = useState([])
  const [completedArray, setCompletedArray] = useState([])
  useEffect(() => {

    if (state === null) {
      history.push("/signin");
    } else {

      history.push("/");
    }
  }, [])
  useEffect(() => {
    fetch(BASE_URL + "/getProfile", {
      headers: {
        "content-type": "application/json",
        authorization: state
      }
    })
      .then(res => res.json()).then((data) => {
        setUser(data.message)
        // console.log(user._id);

      }).catch((err) => {
        console.log(err);
      })
  }, []);
  useEffect(() => {
    fetch(BASE_URL + "/getTasks", {
      headers: {
        "content-type": "application/json",
        authorization: state
      }
    })
      .then(res => res.json()).then((data) => {
        setTaskArray(data?.message)
        // console.log(data.message);

      }).catch((err) => {
        console.log(err);
      })
  }, [user]);
  const deleteTask = async (_id) => {
    await fetch(BASE_URL + "/deleteTasks/" + _id, {
      method: "delete",
      headers: { "Content-Type": "application/json", authorization: state }
    }).then(res => res.json()).then(data => {
      console.log("Delete Data", data);
    })
  }
  const InProgress = async (_id) => {
    await fetch(BASE_URL + "/in-progress/" + _id, {
      method: "post",
      headers: { "Content-Type": "application/json", authorization: state }
    }).then(res => res.json()).then(data => {
      console.log("InProgress Data", data);
    })
  }
  console.log("Task Array", todoArray);
  //bring the todos in the TODO List.
  const structure = {
    "todo": {
      title: "Todo",
      items: todoArray,
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    "completed": {
      title: "Completed",
      items: [],
    },
  }
  const [stateArray, setState] = useState(structure);

  console.log(structure);

  const logoutUser = () => {
    dispatch({ type: "CLEAR" })
    history.push('/signin');
    localStorage.clear();

  }
  const LeftSide = () => {
    return (
      <>
        <h3 className="text-center mb-5">Todonizer</h3>
        <div className="d-flex flex-column align-items-center justify-content-between">

          <h5>
            <img src={home} className="img-responsive img-fluid " />  Overview
          </h5>
          <h5>
            <img src={stats} className="img-responsive img-fluid " />  Stats
          </h5>
          <h5>
            <img src={project} className="img-responsive img-fluid " />   Projects
          </h5>
          <h5>
            <img src={chat} className="img-responsive img-fluid " />   Chat
          </h5>
          <h5>
            <img src={calender} className="img-responsive img-fluid " />   Calender
          </h5>
          <div>
            <h5>
              <img src={setting} className="img-responsive img-fluid " /> Settings
            </h5>
            <h5 type="button" data-toggle="modal" data-target="#myexampleModal">
              <img src={logout} className="img-responsive img-fluid " />   Logout
              <div class="modal fade" id="myexampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#329c89", fontWeight: "600" }}>Logout?</h4>
                      {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button> */}
                    </div>
                    <div class="modal-body">
                      <div className="d-flex justify-content-end align-items-center">
                        <h5 type="button" class="saveButton" data-dismiss="modal" onClick={() => {
                          logoutUser()
                        }}>Logout </h5>
                        <h5 type="button" style={{ color: "#329c89" }} data-dismiss="modal">No</h5>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </h5>

          </div>
        </div>
      </>
    )
  }

  const handleDragEnd = ({ destination, source }) => {
    // if (!destination) {
    //   return
    // }
    // if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //   return
    // }
    // if (destination.droppableId == "in-progress") {
    //   InProgress("6162ecb1af086d61cf30df03");
    // }
    // const itemCopy = { ...stateArray[source.droppableId].items[source.index] }
    // setState(prev => {
    //   prev = { ...prev }
    //   prev[source.droppableId].items.splice(source.index, 1);
    //   prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
    //   return prev
    // })
  }


  const SaveDataToDB = async () => {

    await fetch(BASE_URL + "/addTasks", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: state },
      body: JSON.stringify({
        title,
        description, user_id: user._id

      })
    }).then(res => res.json()).then((data) => {
      console.log(data);
      setTaskMessage(data.message);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="container-fluid mt-4 " >
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-6 mx-auto" style={{ borderRight: "1px solid #979797" }}>
          <LeftSide />
        </div>
        <div className="col-lg-10 col-md-10 col-sm-6 mx-auto">
          <button type="button" className="addButton" data-toggle="modal" data-target="#exampleModal">
            <img src={addButton} className="img-responsive img-fluid" />
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="exampleModalLabel" style={{ color: "#329c89", fontWeight: "600" }}>Add Todo</h4>
                  {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button> */}
                </div>
                <div class="modal-body">
                  <hr />
                  <div className="d-flex flex-column">
                    <input required className="input_modal" placeholder="Add Title here" type="text" onChange={(e) => { setTitle(e.target.value) }} />
                    <input required className="input_modal" placeholder="Add Description here" type="text" onChange={(e) => { setDescription(e.target.value) }} />
                  </div>
                </div>
                <div class="modal-footer">
                  <h5 type="button" class="saveButton" onClick={() => { SaveDataToDB() }}>Save </h5>
                  <h5 type="button" style={{ color: "#329c89" }} data-dismiss="modal">Close</h5>
                </div>
              </div>
            </div>
          </div>
          <DragDropContext
            onDragEnd={
              handleDragEnd}
          ><div className="row">

              {_.map(stateArray, (data, key) => {
                return (
                  <div className="col-lg-4 col-md-4 col-sm-12 mx-auto row-back" key={key}>
                    <div className="d-flex justify-content-between"><h3>
                      {data.title}</h3>
                      <p className="count">{(data.items.length)}</p></div>

                    <Droppable droppableId={key} className=" ">
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="col-back"
                          >{
                              data.items.map((el, index) => {
                                return (
                                  <Draggable key={el._id} draggableId={el._id} index={index} >
                                    {(provided) => {
                                      return (<div className="items"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <h5 style={{ textDecoration: "ellipses" }}>
                                          {el.title}<ion-icon name="trash" style={{ cursor: "pointer" }} onClick={() => { deleteTask(el._id) }}></ion-icon>
                                        </h5>
                                        {el.description}

                                      </div>)
                                    }}
                                  </Draggable>
                                )
                              })}
                            {provided.placeholder}</div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}</div>

          </DragDropContext>
        </div>
      </div>

    </div>
  );
};

export default Todo;
