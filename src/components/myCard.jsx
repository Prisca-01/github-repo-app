import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import 'tailwindcss/tailwind.css';


const MyCard = ({ Title }) => {
  return (
    <div className="col-span-1 w-full h-full">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>
            <Link
              to={`/repo/${Title}`}
              className="block w-full h-full p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              {Title}
            </Link>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MyCard;
