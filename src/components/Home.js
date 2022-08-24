import React, { useEffect, useState } from 'react';
import { db } from '../firebase.init';
import { uid } from 'uid';
import { onValue, ref, set } from 'firebase/database';
const Home = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

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


    return (
        <div>
            <div className='flex items-center mt-12 flex-col'>
                <h3 className='text-3xl font-extrabold mb-2 font-mono'>Add Task</h3>
                <div className="form-control w-full md:w-1/2">
                    <form onSubmit={createTodo} className="input-group ">
                        <input type="text" name='task' value={task} onChange={handleChange} placeholder="Write task" className="input w-full text-2xl focus:outline-0 input-bordered" />
                        <button type='submit' className="btn btn-square input-bordered bg-white hover:bg-[#F44336] hover:input-bordered">
                            Add
                        </button>
                    </form>
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
                                            <button className='btn btn-primary'>Update</button>
                                            <button className='btn btn-primary'>Delete</button>
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