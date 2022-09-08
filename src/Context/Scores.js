//state DB management
//save a score setDoc
//delete a score deleteDoc
//erase all scores
// getAllScores OR getScoresByUser or getTop100Scores, getBottom100Scores, etc...
//scalability if possible to fetch filtered results (through firebase) based on user results

//all time leaderboard -- readDoc -- snapshot

import { doc, setDoc } from "firebase/firestore";

//pass display name and loginEmail and date as well as score

export async function saveNewScore(score) {
  // score = {
  //     user: email@email.com,
  //     score: 70%,
  //     date_time: 10/12/2022
  // }
  // const docRef = await addDoc(collection(db, "cities"), {
  //     name: "Tokyo",
  //     country: "Japan"
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  //   return docRef (or the actual document);
}

// This should move to a child component
export async function addNewScore() {
  console.log("adding new score...");
  const newScore = {
    // user:
    // score:
    // points_possible:
    // date:
  };
  return null;
  // return saveNewScore(newScore).then((savedScore) => {
  //   setScore(savedScore);
}
