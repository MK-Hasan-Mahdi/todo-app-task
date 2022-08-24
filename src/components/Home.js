import React, { useEffect, useState } from 'react';
import { db } from '../firebase.init';
import { uid } from 'uid';
import { onValue, ref, remove, set, update } from 'firebase/database';
const Home = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState('');


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
        if (task === true) {
            setTask();
        }
        else {
            setTask(e.target.value);
        }

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

    const handleCompleteTask = (uuid) => {
        update(ref(db, `/${uuid}`), {
            completed: true,
        });
    }

    return (
        <div>
            <div className='flex items-center mt-12 flex-col'>
                <h3 className='text-3xl font-extrabold mb-2 font-mono'>Add Task</h3>
                <div className="form-control w-full md:w-1/2">
                    <input type="text" name='task' value={task} onChange={handleChange} placeholder="Write task" className="input w-full text-2xl focus:outline-0 input-bordered" />
                    {isEdit ? (
                        <>
                            <button onClick={handleUpdateSubmit} className="btn btn-primary w-96 mx-auto my-2">Update</button>
                            <button className='btn btn-success w-96 mx-auto my-2'
                                onClick={() => {
                                    setIsEdit(false);
                                    setTask("");
                                }}
                            >
                                Cancel Update
                            </button>
                        </>
                    ) : (
                        <button onClick={createTodo} className="btn btn-primary w-96 mx-auto my-2">Submit</button>
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

                                    {tasks.map(task => {
                                        return <tr className='flex items-center py-2 shadow-md my-2 gap-2'>
                                            <input type="checkbox" onClick={() => handleCompleteTask(task.uuid)} className='checkbox' />{task.task}
                                            <button onClick={() => handleUpdate(task)} className='btn btn-sm btn-primary'>Edit</button>
                                            <button onClick={() => handleDelete(task)} className='btn btn-sm btn-danger'>Delete</button>
                                        </tr>
                                    })}
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