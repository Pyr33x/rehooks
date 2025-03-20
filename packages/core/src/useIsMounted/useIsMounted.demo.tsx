import { useEffect, useState } from "react";
import { useIsMounted } from "./index";

function Component() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isMounted = useIsMounted();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await new Promise<string>((resolve) =>
          setTimeout(() => resolve("Data loaded"), 2000),
        );

        if (isMounted()) {
          setData(response);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted()) {
          setData("Error loading data");
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isMounted]);

  return <div>{loading ? "Loading..." : data}</div>;
}
