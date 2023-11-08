import { CheckCircle, Circle, Trash } from "phosphor-react";
import { useState } from "react";
interface taskProps {
    content: string
    onDeleteTask: (task: string) => void
    onCompleteTask: (task: string) => void
}

export function Task({ content, onDeleteTask, onCompleteTask }: taskProps ) {

    const [isTaskComplete, setTaskComplete] = useState(false);

    function handleTaskComplete() {
        onCompleteTask(content);
        setTaskComplete(!isTaskComplete)
    }

    function handleDeleteTask() {
        onDeleteTask(content)
    }

    return (
        <>
            <div className="w-full flex items-start justify-between text-sm p-[1rem] gap-3 bg-gray-500 border-[1px] border-gray-400 rounded-lg">
                <div className="flex items-center">
                    <button onClick={handleTaskComplete}>
                        {
                            isTaskComplete ? <CheckCircle size={30} className="text-purple-dark hover:text-purple p-1.5 transition" weight="fill"/> : <Circle size={30} className="text-blue hover:text-blue-dark p-1.5 transition"/>
                        }
                    </button>
                    <div>
                        <p className={isTaskComplete ? "text-gray-300 line-through transition" : "text-gray-100 transition"}>{content}</p>
                    </div>
                </div>
                <button onClick={handleDeleteTask}>
                    <Trash size={30} className="text-gray-300 p-1.5 hover:text-danger hover:bg-gray-400 rounded-sm transition"/>
                </button>
            </div>
        </>
    )
}