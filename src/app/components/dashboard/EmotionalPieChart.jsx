import React from "react"
import { PieChart, Pie, Cell } from "recharts"

const COLORS = ["#00C49F", "#0088FE", "#FF8042", "#A0AEC0", "#A78BFA"]

export default function EmotionalPieChart({ data }) {
  if (!data || data.length < 3) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        Not enough emotional data available.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <PieChart width={400} height={300}>
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


// import React from "react"
// import { PieChart, Pie, Cell } from "recharts"

// const data = [
//   { name: "Happy", value: 25 },
//   { name: "Calm", value: 35 },
//   { name: "Frustrated", value: 10 },
//   { name: "Sad", value: 10 },
//   { name: "Anxious", value: 20 }
// ]
// const COLORS = ["#00C49F", "#0088FE", "#FF8042", "#A0AEC0", "#A78BFA"]

// export default function EmotionalPieChart() {
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
