import axios from "axios";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
} from "recharts";
import Header from "../../component/features/Header";
import Loader from "../../component/features/Loader";
const HorsePerformanceDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [races, setRaces] = useState([]);
  const [horse, setHorse] = useState("");
  const [players, setPlayers] = useState([]);

  const processEventData = (data) => {
    // Remove null values
    const nonNullEvents = data.filter((item) => item !== null);

    // Group by date and address
    const groupedEvents = nonNullEvents.reduce((acc, event) => {
      const key = `${event.date}-${event.address}`;

      if (!acc[key]) {
        acc[key] = {
          date: event.date,
          address: event.address,
          distance: event.distance,
          num_rounds: event.num_rounds,
          qualified: [...event.qualified],
          totalRiding: [...event.totalRiding],
          disRounds: [...event.disRounds],
          count: 1,
        };
      } else {
        acc[key].qualified = [...acc[key].qualified, ...event.qualified];
        acc[key].totalRiding = [...acc[key].totalRiding, ...event.totalRiding];
        acc[key].disRounds = [...acc[key].disRounds, ...event.disRounds];
        acc[key].count += 1;
      }

      return acc;
    }, {});

    return Object.values(groupedEvents);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/player");
        setPlayers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/race/report/${horse}`);
        console.log(processEventData(res.data));

        setRaces(processEventData(res.data));
        setLoading(false);
        console.log(races?.disRounds);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [horse]);
  const timeToMinutes1 = (time) => {
    const [hours, minutes] = time.split(":");

    const min = parseInt(hours) * 60 + parseInt(minutes);
    return (min / 60).toFixed(2);
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      <div className="p-12  min-h-screen  mx-auto bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          تقرير أداء الحصان
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="mb-2 flex text-black ">
            <select
              disabled={players?.data?.length == 0}
              className="border p-2 rounded w-[300px] text-xl shadow-lg border-blue-400 border-black "
              required
              value={horse}
              onChange={(e) => setHorse(e.target.value)}>
              <option value={""} selected disabled>
                اختر
              </option>
              {players?.data &&
                players?.data?.map((x, i) => (
                  <option value={x?.horse} key={i}>
                    {x?.horse}
                  </option>
                ))}
            </select>
          </div>
        )}

        {horse != "" ? (
          <>
            {/* ملخص الإحصائيات */}
            <div className="mb-8 max-w-3xl mx-auto shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-blue-500">
                    <tr>
                      <th className="text-right p-3 border-b border-gray-200 text-gray-900">
                        اسم السباق
                      </th>
                      <th className="text-right p-3 border-b border-gray-200 text-gray-900">
                        التاريخ
                      </th>
                      <th className="text-right p-3 border-b border-gray-200 text-gray-900">
                        عدد المراحل
                      </th>
                      <th className="text-right p-3 border-b border-gray-200 text-gray-900">
                        المسافة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {races.map((race) => (
                      <tr key={race.name} className="bg-gray-50 text-xl">
                        <td className="text-right p-3 border-b border-gray-200">
                          {race.address}
                        </td>
                        <td className="text-right p-3 border-b border-gray-200">
                          {race.date}
                        </td>
                        <td className="text-right p-3 border-b border-gray-200">
                          {race.num_rounds}
                        </td>
                        <td className="text-right p-3 border-b border-gray-200">
                          {race.distance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* رسم بياني للمراكز */}
            <div className=" p-6 mb-8">
              {races?.map((x, i) => (
                <div key={i} className="mt-4">
                  <h2 className=" bg-blue-500 mb-2 p-2 text-lg rounded-lg shadow-lg w-1/4 text-center mx-auto text-white">
                    {x.address}
                  </h2>
                  <div className="w-full overflow-x-auto grid grid-cols-3 gap-2 max-md:grid-cols-2 max-md:gap-2 max-sm:grid-cols-1 max-sm:gap-2">
                    <div className="h-64 bg-white rounded-lg shadow-lg border-blue-400 ">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={x.disRounds.map((distance, index) => ({
                            distance: Number(distance),
                            time: timeToMinutes1(x.totalRiding[index]),
                            speed: (
                              Number(distance) /
                              timeToMinutes1(x.totalRiding[index])
                            ).toFixed(2),
                          }))}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="distance"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                          <Area
                            type="monotone"
                            dataKey="time"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                          />
                          <Area
                            type="monotone"
                            dataKey="speed"
                            stackId="1"
                            stroke="#ffc658"
                            fill="#ffc658"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-64 bg-white rounded-lg shadow-lg border-blue-400 ">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={x.disRounds.map((distance, index) => ({
                            distance: Number(distance),
                            time: timeToMinutes1(x.totalRiding[index]),
                            speed: (
                              Number(distance) /
                              timeToMinutes1(x.totalRiding[index])
                            ).toFixed(2),
                          }))}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="distance"
                            stroke="#8884d8"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="time"
                            stroke="#82ca9d"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="speed"
                            stroke="#ffc658"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-64 bg-white rounded-lg shadow-lg border-blue-400 ">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={x.disRounds.map((distance, index) => ({
                            distance: Number(distance),
                            time: timeToMinutes1(x.totalRiding[index]),
                            speed: (
                              Number(distance) /
                              timeToMinutes1(x.totalRiding[index])
                            ).toFixed(2),
                          }))}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="distance" fill="#8884d8" />
                          <Bar dataKey="speed" fill="#ffc658" />
                          <Bar dataKey="time" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* <div className="h-64 bg-white rounded-lg shadow-lg border-blue-400 ">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          outerRadius={90}
                          data={x.disRounds.map((distance, index) => ({
                            distance: Number(distance),
                            time: timeToMinutes1(x.totalRiding[index]),
                            speed: (
                              Number(distance) /
                              timeToMinutes1(x.totalRiding[index])
                            ).toFixed(2),
                          }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="distance"
                            dataKey="distance"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                          <Radar
                            name="time"
                            dataKey="time"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                          />
                          <Radar
                            name="speed"
                            dataKey="speed"
                            stroke="#ffc658"
                            fill="#ffc658"
                            fillOpacity={0.6}
                          />
                          <Legend />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div> */}
                    <div className="h-80 bg-white rounded-lg shadow-lg border-blue-400">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="50%"
                          cy="50%"
                          innerRadius="10%"
                          outerRadius="80%"
                          barSize={10}
                          data={x.disRounds.map((distance, index) => ({
                            distance: Number(distance),
                            time: timeToMinutes1(x.totalRiding[index]),
                            speed: (
                              Number(distance) /
                              timeToMinutes1(x.totalRiding[index])
                            ).toFixed(2),
                            fill: COLORS[index],
                          }))}>
                          <RadialBar
                            minAngle={15}
                            background
                            clockWise
                            dataKey="distance"
                            label={{ position: "insideStart", fill: "#000" }}
                          />
                          <RadialBar
                            minAngle={15}
                            background
                            clockWise
                            dataKey="time"
                            label={{ position: "insideStart", fill: "#000" }}
                          />
                          <RadialBar
                            minAngle={15}
                            background
                            clockWise
                            dataKey="speed"
                            label={{ position: "insideStart", fill: "#000" }}
                          />
                          <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                          />
                          <Tooltip />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-80 bg-white rounded-md shadow-lg border-blue-400">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={x.disRounds.map((distance, index) => ({
                                distance: Number(distance),
                                time: timeToMinutes1(x.totalRiding[index]),
                                speed: (
                                  Number(distance) /
                                  timeToMinutes1(x.totalRiding[index])
                                ).toFixed(2),
                                efficiency: (
                                  (Number(distance) /
                                    timeToMinutes1(x.totalRiding[index])) *
                                  100
                                ).toFixed(2),
                              }))}
                              dataKey="distance"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label={(entry) =>
                                `${entry.name}: ${entry.distance}`
                              }>
                              {COLORS.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HorsePerformanceDashboard;
