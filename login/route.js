import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
connectDb();

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        // 1.get user
        const user = await User.findOne({
            email: email,
        });
        console.log(user);
        if (user == null) {
            throw new Error("user not found");
        }
        // 2.password check
        const matched = bcrypt.compareSync(password, user.password);
        if (!matched) {
            throw new Error("Password is Invalid!!");
        }

        //3. generate token

        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_KEY);

        console.log(token);

        //4. create NextResponse  --cookies
        const response = NextResponse.json({
            message: "Login success",
            success: true,
            user: user
        }) 

        response.cookies.set("authToken", token, {
            expiresIn: '1d',
            httpOnly: true
        })
        return response;
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: 500
        })
    }
}