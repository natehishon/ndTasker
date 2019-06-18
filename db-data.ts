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
    }


};

export function findTaskById(taskId: number) {
    return TASKS[taskId];
}

export function findSubTasksForTask(taskId: number) {
    return Object.values(SUBTASKS).filter(subTask => subTask.taskId == taskId);
}

