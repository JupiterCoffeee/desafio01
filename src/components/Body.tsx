import { PlusCircle, ClipboardText } from "phosphor-react"
import { Task } from "./Task"
import { InvalidEvent, useState, FormEvent, ChangeEvent } from "react";

export function Body() {

    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [completeTasks, setCompleteTasks] = useState([]);

    function handleNewTask(event: FormEvent) {
        event?.preventDefault();
        const newTaskContent = event?.target.task.value;
        setTasks([...tasks, newTaskContent]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event?.target.setCustomValidity('')
        setNewTaskText(event?.target.value);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event?.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function completeTask(taskToComplete: string) {
        const tasksWithoutCompleteOne = tasks.filter(task => {
            return task != taskToComplete
        })
        const areTasksEqual = completeTasks.filter(task => {
            return task == taskToComplete
        })
        if (areTasksEqual.length >= 1) {
            return
        } else {
            setTasks(tasksWithoutCompleteOne)
            setCompleteTasks([...completeTasks, taskToComplete])
        }
    }

    function deleteTask(taskToDelete: string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task != taskToDelete;
        })
        const completeTasksWithoutDeletedOne = completeTasks.filter(task => {
            return task != taskToDelete;
        })
        setTasks(tasksWithoutDeletedOne);
        setCompleteTasks(completeTasksWithoutDeletedOne);
    }

    const isNewTaskEmpty = newTaskText.length == 0;
    const taskCount = tasks.length;
    const completeTaskCount = completeTasks.length;
    const isTaskListEmpty = tasks.length == 0
    const isCompleteTaskListEmpty = completeTasks.length == 0

    return (
        <>
            <header>
                <form onSubmit={handleNewTask} className="flex gap-2 -mt-7">
                    <input 
                        type="text" 
                        placeholder="Adicione uma nova tarefa" 
                        name="task" 
                        id="ftask"
                        required
                        value={newTaskText}
                        onChange={handleNewTaskChange}
                        onInvalid={handleNewTaskInvalid}
                        className="bg-gray-500 border-[1px] border-gray-700 w-full text-gray-300 p-4 rounded-lg focus:outline-1 focus:text-gray-100 focus:outline-purple-dark"
                    />
                    <button className="bg-blue-dark rounded-lg text-gray-100 flex items-center justify-center text-sm p-4 gap-2 hover:bg-blue transition disabled:opacity-80 disabled:cursor-not-allowed" disabled={isNewTaskEmpty}>Criar <PlusCircle className="mt-1"/></button> 
                </form>
            </header>
            <section className="flex flex-col gap-6 w-full mt-10">
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                        <span className="text-blue text-sm">Tarefas criadas</span>
                        <span className="bg-gray-400 text-gray-100 text-sm flex items-center px-3 py-[0.125rem] rounded-full">{taskCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-purple text-sm">Concluídas</span>
                        <span className="bg-gray-400 text-gray-100 text-sm flex items-center px-3 py-[0.125rem] rounded-full">
                            {isTaskListEmpty && isCompleteTaskListEmpty ? "0" : `${completeTaskCount} de ${taskCount + completeTaskCount}`}
                        </span>
                    </div>
                </div>
                {
                    isTaskListEmpty && isCompleteTaskListEmpty ?
                    <div className="flex flex-col gap-2 items-center border-t-[1px] border-gray-400 text-gray-300 py-[4rem]">
                        <ClipboardText weight="thin" className="w-[3.5rem] h-[3.5rem]"/>
                        <div>
                            <span className="font-bold">Você ainda não tem tarefas cadastradas</span>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {tasks.map(item => {
                                    return (
                                        <Task 
                                        key={item} 
                                        content={item}
                                        isTaskComplete={false}
                                        onDeleteTask={deleteTask}
                                        onCompleteTask={completeTask}
                                    />
                                    )
                            })}
                        </div>
                        <div className="flex flex-col gap-4">
                        {completeTasks.map(item => {
                                return (
                                    <Task 
                                    key={item} 
                                    content={item}
                                    isTaskComplete={true}
                                    onDeleteTask={deleteTask}
                                    onCompleteTask={completeTask}
                                />
                                )
                        })}
                    </div>
                </div>
                }
            </section>
        </>
    )
}