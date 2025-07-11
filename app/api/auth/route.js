import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {
    console.log("=== Starting POST /api/auth ===")
    
    const body = await request.json()
    const { action, email, password, name, role } = body
    
    console.log("Auth action:", action, "for email:", email)
    
    if (!action || !email || !password) {
      console.error("Missing required fields:", { action: !!action, email: !!email, password: !!password })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    console.log("MongoDB client obtained successfully")
    
    const db = client.db("llmfied")
    console.log("Database selected: llmfied")

    if (action === "register") {
      console.log("Processing registration for:", email)
      
      const existingUser = await db.collection("users").findOne({ email })
      if (existingUser) {
        console.log("User already exists:", email)
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
      }

      console.log("Hashing password...")
      const hashedPassword = await bcrypt.hash(password, 12)
      
      console.log("Creating new user...")
      const user = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
        name,
        role: role || "learner",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      console.log("User created with ID:", user.insertedId)
      
      console.log("Generating JWT token...")
      const token = jwt.sign({ userId: user.insertedId, email, role: role || "learner" }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })

      console.log("Registration successful for:", email)
      return NextResponse.json({ token, user: { id: user.insertedId, email, name, role: role || "learner" } })
    }

    if (action === "login") {
      console.log("Processing login for:", email)
      
      const user = await db.collection("users").findOne({ email })
      if (!user) {
        console.log("User not found:", email)
        return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
      }

      console.log("User found, verifying password...")
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        console.log("Invalid password for:", email)
        return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
      }

      console.log("Password valid, generating token...")
      const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })

      console.log("Login successful for:", email, "with role:", user.role)
      return NextResponse.json({
        token,
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
      })
    }
    
    console.error("Invalid action:", action)
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    
  } catch (error) {
    console.error("=== AUTH API ERROR ===")
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    console.error("=== END AUTH ERROR ===")
    
    return NextResponse.json({ 
      error: "Authentication failed",
      details: error.message,
      type: error.constructor.name
    }, { status: 500 })
  }
}
