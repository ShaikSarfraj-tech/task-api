import { User } from "@/models/user";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { userId } = params;
    const user = await User.findById(userId).select("-password");

    return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
    const { userId } = params;
    
    try {
        await User.deleteOne({
            _id: userId,
        });

        return NextResponse.json({
            message: "User deleted!!",
            success: true
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error in deleting user",
            success: false
        })
    }
}

export async function PUT(request, { params }) {
    const { userId } = params;

    const { name, password, about, profileUrl } = await request.json();

     try {
        const user = await User.findById(userId);

        user.name = name;
        user.password = password;
        user.about = about;
        user.profileUrl = profileUrl;

        const updatedUser = await user.save();
        return NextResponse.json(updatedUser);

     } catch (error) {
        
     }
}