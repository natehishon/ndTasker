export const TASKS: any = {

  1: {
    id: 1,
    titles: {
      description: 'Test task description',
      longDescription: 'Tesk task long description'
    },
    iconUrl: 'https://i.imgur.com/r3iOmUV.jpg',
    categories: ['BEGINNER'],
    seqNo: 0,
    url: 'first-task'
  },

  2: {
    id: 2,
    titles: {
      description: 'Test task description2',
      longDescription: 'Tesk task long description2'
    },
    iconUrl: 'https://i.imgur.com/r3iOmUV.jpg',
    categories: ['ADVANCED'],
    seqNo: 2,
    url: 'second-task'
  },
  3: {
    id: 3,
    titles: {
      description: 'Test task description3',
      longDescription: 'Tesk task long description3'
    },
    iconUrl: 'https://i.imgur.com/r3iOmUV.jpg',
    categories: ['BEGINNER'],
    seqNo: 3,
    url: 'third-task'
  }

};


export const SUBTASKS = {

  1: {
    id: 1,
    'description': 'Sub task description 1',
    'iconUrl': '',
    'seqNo': 1,
    taskId: 1
  },
  2: {
    id: 2,
    'description': 'Sub task description 2',
    'iconUrl': '2:07',
    'seqNo': 2,
    taskId: 1
  },
  3: {
    id: 3,
    'description': 'Sub task description 3',
    'iconUrl': 'yo',
    'seqNo': 1,
    taskId: 2
  },
  4: {
    id: 4,
    'description': 'Sub task description 4',
    'iconUrl': '4:44',
    'seqNo': 2,
    taskId: 2
  },
  5: {
    id: 5,
    'description': '5th subtask',
    'iconUrl': 'url',
    'seqNo': 3,
    taskId: 1
  },
  6: {
    id: 6,
    'description': '6th subtask',
    'iconUrl': 'url',
    'seqNo': 4,
    taskId: 1
  },
  7: {
    id: 7,
    'description': 'Sub task description 7',
    'iconUrl': '4:44',
    'seqNo': 3,
    taskId: 2
  },
  8: {
    id: 8,
    'description': 'Sub task description 8',
    'iconUrl': '4:44',
    'seqNo': 4,
    taskId: 2
  },
  9: {
    id: 9,
    'description': 'Sub task description 9',
    'iconUrl': '4:44',
    'seqNo': 1,
    taskId: 3
  },
  10: {
    id: 10,
    'description': 'Sub task description 10',
    'iconUrl': '4:44',
    'seqNo': 2,
    taskId: 3
  },
  11: {
    id: 11,
    'description': 'Sub task description 11',
    'iconUrl': '4:44',
    'seqNo': 3,
    taskId: 3
  },
  12: {
    id: 12,
    'description': 'Sub task description 12',
    'iconUrl': '4:44',
    'seqNo': 4,
    taskId: 4
  },


};

export function findTaskById(taskId: number) {
  return TASKS[taskId];
}

export function findSubTasksForTask(taskId: number) {
  return Object.values(SUBTASKS).filter(subTask => subTask.taskId == taskId);
}

