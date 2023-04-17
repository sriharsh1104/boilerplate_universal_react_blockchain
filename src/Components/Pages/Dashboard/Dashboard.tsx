import { Col, Container, Row } from "react-bootstrap";
import CommonHeading from "../../Common/CommonHeading/CommonHeading";
import DashboardCard from "./DashboardCard/DashboardCard";
import btc from "../../../Assets/Images/Icons/tokens/bitcoin.svg";
import busd from "../../../Assets/Images/Icons/tokens/busd.png";
import bnb from "../../../Assets/Images/Icons/tokens/BNB.png";
import eth from "../../../Assets/Images/Icons/tokens/Eth.svg";
import "./Dashboard.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const theme = useSelector((state: any) => state?.theme?.theme);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 200, 300, 400, 400, 300, 255],
        borderColor: theme === "light" ? "#ccc" : "#555",
        backgroundColor: theme === "light" ? "#ccc" : "#555",
      },
    ],
  };

  const Carddata = [
    {
      id: 1,
      name: "BTC",
      icon: btc,
      total: "24,200",
    },
    {
      id: 2,
      name: "BUSD",
      icon: busd,
      total: "26,500",
    },
    {
      id: 3,
      name: "BNB",
      icon: bnb,
      total: "44,200",
    },
    {
      id: 4,
      name: "ETH",
      icon: eth,
      total: "38,140",
    },
  ];
  const pieChartData: any = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    title: ["VE", "VE", "VE", "VE", "VE", "VE"],
    legends: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    plugins: {
      title: ["VE", "VE", "VE", "VE", "VE", "VE"],
    },
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="user_details">
      <Container fluid>
        <CommonHeading heading="Dashboard" />
        <Row>
          {Carddata.map((item) => (
            <Col xl={3} sm={6} key={item.id}>
              <DashboardCard
                name={item.name}
                icon={item.icon}
                total={item.total}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col xl={9}>
            <div className="user_detail_box d-flex align-items-center justify-content-center">
              <Line height={100} options={options} data={data} />
            </div>
          </Col>
          <Col xl={3}>
            <div className="user_detail_box d-flex align-items-center justify-content-center">
              <Pie data={pieChartData} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
