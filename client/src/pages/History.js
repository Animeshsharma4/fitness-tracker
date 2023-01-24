import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth"
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([])
  const loggedIn = Auth.loggedIn();
  let currentDate;

  // everytime loggedIn/userdata changes, the getuserdata runs
  useEffect(() => {
    const getUserData = async () => {
      try {
        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token)

        if (!response.ok) {
          throw new Error("something went wrong!")
        }

        const user = await response.json()

        // combine cardio and resistance data together
        if (user.cardio && user.resistance) {
          const cardio = user.cardio;
          const resistance = user.resistance;
          const exercise = cardio.concat(resistance);

          // sort exercise data by date
          exercise.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })

          //format date in exercise data
          exercise.forEach(item => {
            item.date = formatDate(item.date)
          });

          setUserData(user);
          setExerciseData(exercise)
        }
      } catch (err) { console.error(err) }
    };
    getUserData();
  }, [loggedIn, userData])

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="history d-flex flex-column align-items-center">
        <h2 className='title'>History</h2>
        {exerciseData.length ? null :
          (<div>
            <h3 className='history-text'>No exercise data yet...</h3>
            <Link to="/exercise"><button className='home-btn'>Add Exercise</button></Link>
          </div>
          )}
        <div>
          {exerciseData.map((exercise) => {
            let dateToDisplay;
            if (exercise.date !== currentDate) {
              currentDate = exercise.date;
              dateToDisplay = exercise.date;
            }
            return (
              <div className='history-div d-flex' key={exercise._id}>
                <div className='date d-flex align-items-center'>{dateToDisplay}</div>
                <Link className='text-decoration-none' to={`/history/${exercise.type}/${exercise._id}`}>
                  {exercise.type === "cardio" ? (
                    <div className="history-card cardio-title d-flex">
                      <div className='d-flex align-items-center'><img alt="cardio" src={cardioIcon} className="history-icon" /></div>
                      <div>
                        <p className='history-name'>{exercise.name}</p>
                        <p className='history-index'>{exercise.distance} miles </p>
                      </div>
                    </div>) : (
                    <div className="history-card resistance-title d-flex">
                      <div className='d-flex align-items-center'><img alt="resistance" src={resistanceIcon} className="history-icon" /></div>
                      <div >
                        <p className='history-name'>{exercise.name}</p>
                        <p className='history-index'>{exercise.weight} pounds </p>
                      </div>
                    </div>)}

                </Link>
              </div>
            )
          })}
        </div>
      </div >
    </div >
  )
}
