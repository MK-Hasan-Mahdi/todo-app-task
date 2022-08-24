import React, { useEffect, useState } from 'react';
import { db } from '../firebase.init';
import { uid } from 'uid';
import { onValue, ref, remove, set, update } from 'firebase/database';
const Home = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState('');

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    }
    const createTodo = (e) => {
        e.preventDefault();
        const uuid = uid();
        set(ref(db, `/${uuid}`), {
            task,
            uuid,
        })
    };
    const handleChange = (e) => {
        setTask(e.target.value);

    }
    // read
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTasks([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(task => {
                    setTasks((oldArray) => [...oldArray, task]);
                })
            }
        })
    }, []);

    // delete
    const handleDelete = (task) => {
        remove(ref(db, `/${task.uuid}`));
    }
    // update  
    const handleUpdate = (task) => {
        setIsEdit(true);
        setTempUuid(task.uuid);
        setTask(task.task);

    }
    const handleUpdateSubmit = () => {
        update(ref(db, `/${tempUuid}`), {
            task,
            uuid: tempUuid,
        });
        setTask('');
        setIsEdit(false);
    }

    return (
        <div>
            <div className='flex items-center mt-12 flex-col'>
                <h3 className='text-3xl font-extrabold mb-2 font-mono'>Add Task</h3>
                <div className="form-control w-full md:w-1/2">
                    <input type="text" value={task} onChange={handleTaskChange} />
                    <input type="text" name='task' value={task} onChange={handleChange} placeholder="Write task" className="input w-full text-2xl focus:outline-0 input-bordered" />
                    {isEdit ? (
                        <>
                            <button onClick={handleUpdateSubmit}>Submit Change</button>
                            <button
                                onClick={() => {
                                    setIsEdit(false);
                                    setTask("");
                                }}
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <button onClick={createTodo}>submit</button>
                    )}
                </div>
            </div>
            <div className='px-2 md:w-1/2 mx-auto'>
                <h2 className='text-3xl my-3 font-extrabold text-center font-mono'>My TaskList</h2>
                <hr className='h-2' />
                <div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Task List</th>
                                    {tasks.map(task => (
                                        <>
                                            <h1>{task.task}</h1>
                                            <button onClick={() => handleUpdate(task)} className='btn btn-primary'>Update</button>
                                            <button onClick={() => handleDelete(task)} className='btn btn-primary'>Delete</button>
                                        </>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;