"use client";
import React from "react"
import { onAuthStateChanged } from "firebase/auth"

import { useState } from "react"
import Calendar from "react-calendar"

export default function CalendarPage() {
  const [value, onChange] = useState(new Date())

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <div>
        <h1>Selected Date:</h1>
      </div>
    </div>
  )
}


//comment to push
