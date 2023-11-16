import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';

connectDb();

export async function GET(request) {
    let users = [];

    try {
        users = await User.find().select("-password");
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to get users",
            success: false
        })
    }

    return NextResponse.json(users);
}

export async function POST(request) {
    console.log("signup called");
    // const body = request.body;
    // console.log(request.method);
    // console.log(request.cookies);
    // console.log(request.headers);
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextUrl.searchParams);

    // const jsonData = await request.json();
    // console.log(jsonData);

    const { name, email, password, about, profileUrl } = await request.json();

    //create user object with user model
    const user = new User({
        name, email, password, about, profileUrl
    });

    // console.log(user);

    try {
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        // console.log(user);
        const createdUser = await user.save();
        console.log(createdUser);

        const response = NextResponse.json(user, {
            status: 201
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to create user",
            status: false
        }, {
            status: 500
        });
    }


    // const textData = await request.text();
    // console.log(textData);

    // return NextResponse.json({
    //     message: 'posting user data'
    // })
}

export function DELETE(request) {
    console.log("delete api called");
    return NextResponse.json({
        message: 'deleted !!',
        status: true
    }, { status: 201, statusText: 'hey changed text' });
}

export function PUT() {

}