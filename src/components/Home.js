import React from 'react';

const Home = () => {
    return (
        <div>
            <div className='flex items-center mt-12 flex-col'>
                <h3 className='text-3xl font-extrabold mb-2 font-mono'>Add Task</h3>
                <div class="form-control w-full md:w-1/2">
                    <form class="input-group ">
                        <input type="text" name='task' placeholder="Write task" class="input w-full text-2xl focus:outline-0 input-bordered" />
                        <button type='submit' class="btn btn-square input-bordered bg-white hover:bg-[#F44336] hover:input-bordered">
                            <img src="" className='w-10 h-10' alt="" />
                        </button>
                    </form>
                </div>
            </div>
            <div className='px-2 md:w-1/2 mx-auto'>
                <h2 className='text-3xl my-3 font-extrabold text-center font-mono'>My TaskList</h2>
                <hr className='h-2' />
                <div>
                    <div class="overflow-x-auto">
                        <table class="table w-full">
                            <thead>
                                <tr>
                                    <th>Task List</th>
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