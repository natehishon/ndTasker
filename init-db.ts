
import {TASKS, findSubTasksForTask} from './db-data';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBu7W_P5Na62F7VgCL-3El6aEfvGdVF-H8",
  authDomain: "ndtasker-fac93.firebaseapp.com",
  databaseURL: "https://ndtasker-fac93.firebaseio.com",
  projectId: "ndtasker-fac93",
  storageBucket: "ndtasker-fac93.appspot.com",
  messagingSenderId: "763683786264",
  appId: "1:763683786264:web:82fa17e1a155c3c2"
};


firebase.initializeApp(config);

const db = firebase.firestore();

async function uploadData() {

  var batch = db.batch();

  const tasks = db.collection('tasks');


  Object.values(TASKS)
    .sort((c1:any, c2:any) => c1.seqNo - c2.seqNo)
    .forEach(async (task:any) => {

      const newTask = removeId(task);

      const taskRef = await tasks.add(newTask);

      const subTasks = taskRef.collection("subTasks");

      const taskSubTasks = findSubTasksForTask(task.id);

      taskSubTasks.forEach(async subTask => {

        const newSubTask = removeId(subTask);

        await subTasks.add(newSubTask);

      });

    });

  return batch.commit();
}


function removeId(data:any) {

  const newData: any = {...data};

  delete newData.id;

  return newData;
}


uploadData()
  .then(() => {
    console.log("Writing data, exiting in 10 seconds ...\n\n");

    setTimeout(() => {

      console.log("\n\n\nData Upload Completed.\n\n\n");
      process.exit(0);

    }, 10000);

  })
  .catch(err => {
    console.log("Data upload failed, reason:", err, '\n\n\n');
    process.exit(-1);
  });


