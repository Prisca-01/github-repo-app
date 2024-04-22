import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { useState, useEffect } from "react";
  
  const MyCard = ({Title, description, created}) => {
    // const [repoData, setRepoData] = useState([]);
    // useEffect(() => {
    //   // Fetch repo data about the GitHub user
    //   fetch("https://api.github.com/users/prisca-01/repos")
    //     .then((res) => res.json())
    //     .then(
    //       (result) => {
    //         console.log(result);
    //         setRepoData(result);
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    // }, []);
  
    return (
      <div>
        
          <Card  className="col-span-1">
            <CardHeader>
              <CardTitle> {Title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p> created: {created} </p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
      
      </div>
    );
  };
  
  export default MyCard;
  