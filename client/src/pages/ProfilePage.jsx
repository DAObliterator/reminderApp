import React , { useState , useEffect , useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { ProfileCard } from '../components/ProfileCard';
import AddIcon from "@mui/icons-material/Add";


export const ProfilePage = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const [ addTask , setAddTask ] = useState(false);
    const [hour , setHour] = useState("1");
    const [minute , setMinute] = useState("01");
    const [ amPM , setAMPM ] = useState("AM");
    const [ arrayOfTasks , setArrayOfTasks ] = useState([]);
    const [arrayOfTimes, setArrayOfTimes] = useState(["1:01AM"]);
    const [medicine , setMedicine ] = useState("");
    const [arrayOfDays , setArrayOfDays ] = useState(["Monday"]);
    const [ day , setDay ] = useState("Monday");
    const [fieldEmptyDialogueBox , setFieldEmptyDialogueBox] = useState(true);
    const [fieldEmpty , setFieldEmpty] = useState(true);
    const [showConfmDltBtn , setShowConfmDltBtn ] = useState(false);
    const [confmDltn , setConfmDltn] = useState(false);

  
    useEffect(() => {

       axios
         .get("http://localhost:6028/task/getAllTasks",  {
           withCredentials: true,
         })
         .then((response) => {
           console.log(
             JSON.stringify(response.data),
             "--response data fom getAllTasks endpoint"
           );
           setArrayOfTasks(response.data.tasks);
         })
         .catch((error) => {
           console.log(
             `${error} --- error happened while fetching all tasks \n`
           );
         });

        axios.get("http://localhost:6028/auth/dummy-route" , { withCredentials: true}).then((response) => {
          console.log(response.data , "111")
        }).catch((error) => {
          console.log(error , "0000")
        })


    } , [])


    const handleAddingTask =  (e) => {
      e.preventDefault();

      console.log("addTask button clicked \n")
      
      setAddTask(true)

    }

    const handleClose = (e) => {
      e.preventDefault();

      setAddTask(false)
    }

    const handleSubmission = (e) => {

      e.preventDefault();

      let taskObject = {
        taskname: medicine,
        Times: arrayOfTimes,
        Days: arrayOfDays,
      };

      console.log(taskObject, "--taskObject insid of handleSubmission 888 \n");

      if ( medicine.length > 0 ) {
        //handle adding to database and then on successfull database updation , update the array of Tasks 

        //handling adding submitted data to database 

        
        axios
          .post(
            "http://localhost:6028/task/add-task",
            { taskname: medicine, Times: arrayOfTimes, Days: arrayOfDays },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(`${JSON.stringify(response.data)} --- from add-task`);
            }
            axios.get("http://localhost:6028/task/getAllTasks" , {withCredentials: true}).then((response) => {
                console.log(JSON.stringify(response.data) , "--response data fom getAllTasks endpoint")
                 setArrayOfTasks(response.data.tasks);
            }).catch((error) => {
              console.log(`${error} --- error happened while fetching all tasks \n`)
            });
           
          })
          .catch((error) => {
            console.log(
              ` ${error} error happened while attempting to add task`
            );
          });

      } else {
          setFieldEmptyDialogueBox(true) //let the user know that they have left one/more field/s empty
      }

    

      setAddTask(false)


    }

    const addArrayOfTimes = (e) => {
      e.preventDefault();

      if (!Array.isArray(arrayOfTimes)) {
          setArrayOfTimes([hour + ":" + minute + amPM]);
      }
      setArrayOfTimes([...arrayOfTimes, hour +  ":" + minute + amPM]);
      
      

    }

    const addArrayOfDays = (e) => {

      e.preventDefault();
       if (!Array.isArray(arrayOfDays)) {
         setArrayOfDays([day]);
       }
      setArrayOfDays([...arrayOfDays , day])

    }

    const deleteDay = (e , index) => {
      e.preventDefault()

      setArrayOfDays((prevArrayOfDays) => {
        prevArrayOfDays.filter(( day , index ) => day != index )
      })
    }

    const deleteTime = (e , index) => {
      e.preventDefault();

      setArrayOfTimes(prevArrayOfTimes => {
        prevArrayOfTimes.filter((time , i ) => i !== index)
      })


    }

    const handleTaskDeletion = (e) => {

      e.preventDefault();

    }

    const hours = []
    for ( let i = 1; i <= 12 ; i++) {
       hours.push(<option value={i.toString()}>{i.toString()}</option>); 
    }

    const minutes = [];
    for (let i = 1; i < 59; i++) {

      if ( i < 10 ) {
        minutes.push(<option value={"0"+i.toString()}>{"0"+i.toString()}</option>);
    } else {
         minutes.push(<option value={i.toString()}>{i.toString()}</option>);
    }
      
     
    }
    
  return (
    <div
      id="Profile-Page-Main"
      className="w-screen h-screen flex flex-col justify-evenly items-center bg-bg1 overflow-auto"
    >
      <ProfileCard></ProfileCard>
      <div
        id="Add-Task-Div"
        className="flex flex-col justify-evenly items-center"
      >
        <h2 className="text-white tracking-wider">Add A Task</h2>
        <button onClick={(e) => handleAddingTask(e)} disabled={addTask}>
          <AddIcon></AddIcon>
        </button>
      </div>
      <div id="All-Tasks-Div" className="flex flex-col justify-evenly items-center w-full h-1/4 overflow-auto m-4">
        {Array.isArray(arrayOfTasks) && arrayOfTasks.map((e,index)=> {
          return (
            <div
              id="Task"
              className="flex flex-row justify-evenly items-center bg-emerald-500 text-white tracking-wide font-bold rounded-md shadow-md min-w-80 min-h-20 m-4"
            >
              <p>{e.taskname}</p>
              {Array.isArray(e.times) &&
                e.times.map((e) => {
                  return <p>{e}</p>;
                })}
              {Array.isArray(e.days) &&
                e.days.map((e) => {
                  return <p>{e}</p>;
                })}
            </div>
          );
        })}
      </div>
      {addTask && (
        <div
          id="Create-New-Task"
          className="flex flex-col justify-center items-center absolute bg-slate-500 bg-opacity-50 w-screen h-screen"
        >
          <div className="flex flex-col justify-evenly items-center bg-bg3 w-1/2 h-80% rounded-md z-20 shadow-md min-w-64 min-h-80 p-4 ">
            <button
              id="Destroy-Modal-btn absolute top-0 right-0"
              onClick={(e) => handleClose(e)}
            >
              X
            </button>
            <h1 className="text-xl tracking-wider text-center m-4">
              SCHEDULE TIME/S FOR TAKING MEDICINES{" "}
            </h1>
            <form
              action=""
              id="Medicine-Form"
              onSubmit={(e) => handleSubmission(e)}
              className="flex flex-col justify-evenly items-center"
            >
              <div
                id="Medicine-Name"
                className="flex flex-row justify-evenly text-lg m-2 sm:m-4"
              >
                <label htmlFor="medicine-input">MEDICINE NAME: </label>
                <input type="text" className="max-w-36" onChange={(e) => setMedicine(e.target.value)} />
              </div>
              <div
                id="Time"
                className="flex flex-row justify-evenly items-center"
              >
                <label htmlFor="time-select" className="pr-2">
                  PICK A TIME/S{" "}
                </label>
                <form id="time-select" className="flex flex-row m-2 sm:m-4">
                  <select
                    name="hour-select"
                    id="hour-select"
                    onChange={(e) => setHour(e.target.value)}
                    value={hour}
                  >
                    {hours}
                  </select>
                  <select
                    name="minute-select"
                    id="minute-select"
                    onChange={(e) => setMinute(e.target.value)}
                    value={minute}
                  >
                    {minutes}
                  </select>
                  <select
                    name="AM-PM-select"
                    id="AM-PM-select"
                    onChange={(e) => setAMPM(e.target.value)}
                    value={amPM}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <button
                    className="max-w-32 max-h-10 ml-2 sm:ml-4"
                    onClick={(e) => addArrayOfTimes(e)}
                  >
                    ADD TIME +{" "}
                  </button>
                </form>
                <div id="flex flex-row" className="overflow-auto">
                  {Array.isArray(arrayOfTimes) &&
                    arrayOfTimes.map((e, index) => {
                      return (
                        <button
                          key={index}
                          onClick={(e, index) => deleteTime(e, index)}
                        >
                          {e}
                        </button>
                      );
                    })}
                </div>
              </div>
              <div
                id="Days"
                className="flex flex-row justify-evenly items-center"
              >
                <label htmlFor="days-select" className="pr-2">
                  PICK DAY/S{" "}
                </label>
                <select
                  value={day}
                  name="day-select"
                  id="day-select"
                  multiple
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <button
                  id="Add-Day-Button"
                  className="max-w-32 max-h-10 ml-2 sm:ml-4"
                  onClick={(e) => addArrayOfDays(e)}
                >
                  ADD DAY+
                </button>
              </div>
              <div id="selected-days">
                {Array.isArray(arrayOfDays) &&
                  arrayOfDays.map((e, index) => {
                    return (
                      <button
                        onClick={(e, index) => deleteDay(e, index)}
                        key={index}
                      >
                        {e}
                      </button>
                    );
                  })}
              </div>
              <button
                id="Medicine-Form-Btn"
                className="rounded-md"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {!fieldEmpty && <fieldEmptyDialogue fieldEmptyDialogueBox = {fieldEmptyDialogueBox} setFieldEmpty = {setFieldEmptyDialogueBox} ></fieldEmptyDialogue> }
    </div>
  );
}


const fieldEmptyDialogue = ({ fieldEmptyDialogueBox , setFieldEmptyDialogueBox}) => {

  const handleFieldEmptyBox =(e) => {
    e.preventDefault();
    setFieldEmptyDialogueBox(true);
  }


  return (
    <div
      id="Field-Empty-Dialogue"
      className="flex flex-col justify-center items-center absolute bg-slate-500 bg-opacity-50 w-screen h-screen"
    >
      <div className="flex flex-col justify-evenly items-center bg-white w-1/2 h-80% rounded-md z-20 shadow-md min-w-64 min-h-80 p-4 ">
          <h1>A FIELD IS EMPTY</h1>
          <button id="close-field-dialogue-button"  className='text-lg rounded-md text-red-600 font-bold tracking-wide' onClick={(e) => handleFieldEmptyBox(e)} >
            X
          </button>
      </div>
    </div>
  );

}





