// import React from "react"
// import { PieChart, Pie, Cell } from "recharts"

// const COLORS = ["#00C49F", "#0088FE", "#FF8042", "#A0AEC0", "#A78BFA"]

// export default function EmotionalPieChart({ data }) {
//   if (!data || data.length < 3) {
//     return (
//       <div className="flex items-center justify-center h-full text-slate-500">
//         Not enough emotional data available.
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <PieChart width={400} height={300}>
//         <Pie
//           data={data}
//           innerRadius={70}
//           outerRadius={100}
//           paddingAngle={5}
//           dataKey="value"
//           label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//     </div>
//   )
// }


import React from "react"
import { PieChart, Pie, Cell } from "recharts"
import { useEffect, useState } from "react"

const EMOTIONAL_PRESETS = [
  [
    { name: "Happy", value: 30 },
    { name: "Calm", value: 20 },
    { name: "Sad", value: 10 },
    { name: "Anxious", value: 25 },
    { name: "Frustrated", value: 15 }
  ],
  [
    { name: "Joyful", value: 40 },
    { name: "Content", value: 30 },
    { name: "Worried", value: 10 },
    { name: "Irritated", value: 10 },
    { name: "Blue", value: 10 }
  ],
  [
    { name: "Focused", value: 25 },
    { name: "Tired", value: 25 },
    { name: "Overwhelmed", value: 20 },
    { name: "Excited", value: 20 },
    { name: "Anxious", value: 10 }
  ]
]
const COLORS = ["#00C49F", "#0088FE", "#FF8042", "#A0AEC0", "#A78BFA"]

export default function EmotionalPieChart() {
  const [data, setData] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const randomSet = EMOTIONAL_PRESETS[Math.floor(Math.random() * EMOTIONAL_PRESETS.length)];
    setData(randomSet);
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col items-center justify-center">
      <PieChart width={500} height={250}>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}
