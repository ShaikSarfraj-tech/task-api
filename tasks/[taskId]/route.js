import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

//  api/tasks/taskId
export async function GET(request, { params }) {
    const { taskId } = params;

    try {
        const task = await Task.findById(taskId);
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting task!!", 404, false);
    }
}

//      api/tasks/[taskId]


export async function PUT(request, { params }) {
    console.log("sarfraj", request)
    try {
        const { taskId } = params;
        const task = await Task.findById(taskId);

        const { title, content, status } = await request.json();

        task.title = title;
        task.content = content;
        task.status = status;

        const updatedTask = await task.save();
        return NextResponse.json(updatedTask);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in updating single task", 400, false);
    }
}

export async function DELETE(request, { params }) {
    try {
        const { taskId } = params;
        await Task.deleteOne({
            _id: taskId
        });
        return getResponseMessage("Task Deleted!", 200, true);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in deleteing task!!", 500, false);
    }
}