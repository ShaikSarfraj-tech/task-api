import { User } from "@/models/user";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectDb } from "@/helper/db";

connectDb();

//api to get the current user
export async function GET(request) {
    const authToken = request.cookies.get("authToken")?.value;

    // console.log(authToken);

    const data = jwt.verify(authToken, process.env.JWT_KEY);
    // console.log(data);
    
    const user = await User.findById(data._id).select("-password");
    // console.log(user);
    return NextResponse.json(user)

}

